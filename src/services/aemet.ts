/**
 * @fileoverview Service to interact with the AEMET OpenData API.
 */
'use server';
import fetch from 'node-fetch';
import { z } from 'zod';

const API_KEY = process.env.AEMET_API_KEY;
const API_URL = 'https://opendata.aemet.es/opendata/api';

if (!API_KEY) {
  throw new Error('AEMET_API_KEY is not defined in the environment variables.');
}

// Zod Schemas for data validation
export const AemetMunicipalitySchema = z.object({
  id: z.string(),
  nombre: z.string(),
});
export type AemetMunicipality = z.infer<typeof AemetMunicipalitySchema>;


const AemetWeatherPredictionSchema = z.object({
  elaborado: z.string(),
  nombre: z.string(),
  provincia: z.string(),
  prediccion: z.object({
    dia: z.array(
      z.object({
        fecha: z.string(),
        estadoCielo: z.array(z.object({ value: z.string(), descripcion: z.string(), periodo: z.string().optional() })).nonempty(),
        temperatura: z.object({
          maxima: z.number(),
          minima: z.number(),
        }),
        viento: z.array(z.object({ direccion: z.string(), velocidad: z.number(), periodo: z.string().optional() })).nonempty(),
        humedadRelativa: z.object({
          maxima: z.number(),
          minima: z.number(),
        }),
      })
    ),
  }),
});

export const WeatherDataSchema = z.object({
  location: z.object({
    city: z.string().describe('The city name.'),
    country: z.string().describe('The country code.'),
  }),
  current: z.object({
    temperature: z.number().describe('The current temperature in Celsius.'),
    condition: z.string().describe('The current weather condition.'),
    windSpeed: z.number().describe('The wind speed in km/h.'),
    humidity: z.number().describe('The humidity percentage.'),
  }),
  forecast: z.array(
    z.object({
      day: z.string().describe('The day of the week.'),
      temperature: z.number().describe('The forecasted temperature in Celsius.'),
      condition: z.string().describe('The forecasted weather condition.'),
    })
  ).describe('A weather forecast for the next few days.'),
  maps: z.object({
    cloud: z.string().describe("A URL to the cloud radar map from AEMET."),
    heat: z.string().describe("A URL to the temperature map from AEMET."),
  }),
});
export type WeatherData = z.infer<typeof WeatherDataSchema>;


// Main function to get formatted weather data
export async function getAemetWeatherData(municipality: AemetMunicipality): Promise<WeatherData> {
  try {
    const predictionUrl = `${API_URL}/prediccion/especifica/municipio/diaria/${municipality.id.substring(2)}`;
    const weatherData = await fetchData(predictionUrl);
    
    if (!weatherData || !weatherData[0]) {
        throw new Error("Invalid weather data received from AEMET");
    }

    const validatedWeather = AemetWeatherPredictionSchema.parse(weatherData[0]);
    const today = validatedWeather.prediccion.dia[0];
    const forecastDays = validatedWeather.prediccion.dia.slice(1, 6);

    const dayOfWeek = (dateString: string) => new Date(dateString).toLocaleDateString('es-ES', { weekday: 'long' });

    return {
      location: {
        city: validatedWeather.nombre,
        country: validatedWeather.provincia,
      },
      current: {
        temperature: Math.round((today.temperatura.maxima + today.temperatura.minima) / 2),
        condition: today.estadoCielo.find(e => e.periodo === "00-24")?.descripcion ?? today.estadoCielo[0].descripcion,
        windSpeed: today.viento[0].velocidad,
        humidity: Math.round((today.humedadRelativa.maxima + today.humedadRelativa.minima) / 2),
      },
      forecast: forecastDays.map((day) => ({
        day: dayOfWeek(day.fecha),
        temperature: Math.round((day.temperatura.maxima + day.temperatura.minima) / 2),
        condition: day.estadoCielo.find(e => e.periodo === "00-24")?.descripcion ?? day.estadoCielo[0].descripcion,
      })),
      maps: {
        cloud: 'https://www.aemet.es/imagenes_d/eltiempo/observacion/satelite/202407311200_s83g.gif', // Placeholder static URL
        heat: 'https://www.aemet.es/imagenes_d/eltiempo/prediccion/mapa_temp/tmax_hoy.png', // Placeholder static URL
      },
    };
  } catch (error) {
    console.error('Error processing AEMET data:', error);
    throw new Error('Failed to process weather data from AEMET.');
  }
}

// Helper function to fetch data from AEMET API
export async function fetchData(url: string) {
  try {
    const initialResponse = await fetch(url, {
      headers: { 'api_key': API_KEY, 'Accept': 'application/json' },
    });

    if (initialResponse.status === 429) {
      console.error("AEMET API rate limit exceeded.");
      throw new Error("Rate limit exceeded. Please wait before trying again.");
    }
    
    const initialData = await initialResponse.json() as any;

    if (initialData.estado !== 200) {
      console.error('AEMET API error:', initialData.descripcion);
      throw new Error(`AEMET API Error: ${initialData.descripcion}`);
    }

    const dataResponse = await fetch(initialData.datos);
    if (!dataResponse.ok) {
        throw new Error(`Failed to fetch data from ${initialData.datos}, status: ${dataResponse.status}`);
    }
    return await dataResponse.json();

  } catch (error) {
    console.error(`Failed to fetch from AEMET URL: ${url}`, error);
    throw error;
  }
}
