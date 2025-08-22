/**
 * @fileoverview Service to interact with the AEMET OpenData API.
 */
'use server';
import fetch from 'node-fetch';
import { z } from 'zod';
import type { AemetMunicipality, WeatherData } from '@/lib/types';
import { AemetWeatherPredictionSchema } from '@/lib/types';

const API_KEY = process.env.AEMET_API_KEY;
const API_URL = 'https://opendata.aemet.es/opendata/api';

if (!API_KEY) {
  throw new Error('AEMET_API_KEY is not defined in the environment variables.');
}

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

    // Find the wind data for the whole day if available, otherwise take the first available period
    const windToday = today.viento.find(v => !v.periodo || v.periodo.length === 0) || today.viento[0];

    return {
      location: {
        city: validatedWeather.nombre,
        country: validatedWeather.provincia,
      },
      current: {
        temperature: Math.round((today.temperatura.maxima + today.temperatura.minima) / 2),
        condition: today.estadoCielo.find(e => e.periodo === "00-24")?.descripcion ?? today.estadoCielo[0].descripcion,
        windSpeed: windToday.velocidad,
        humidity: Math.round((today.humedadRelativa.maxima + today.humedadRelativa.minima) / 2),
      },
      forecast: forecastDays.map((day) => ({
        day: dayOfWeek(day.fecha),
        temperature: Math.round((day.temperatura.maxima + day.temperatura.minima) / 2),
        condition: day.estadoCielo.find(e => e.periodo === "00-24")?.descripcion ?? day.estadoCielo[0].descripcion,
      })),
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
    const responseText = await dataResponse.text();
    // AEMET sometimes returns invalid characters at the start of the JSON
    const cleanResponseText = responseText.trim().replace(/^[\u200B-\u200D\uFEFF]/, '');
    return JSON.parse(cleanResponseText);


  } catch (error) {
    console.error(`Failed to fetch from AEMET URL: ${url}`, error);
    throw error;
  }
}
