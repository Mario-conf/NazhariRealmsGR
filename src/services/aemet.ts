/**
 * @fileoverview Service to interact with AEMET and OpenWeatherMap APIs.
 */
'use server';
import fetch from 'node-fetch';
import { z } from 'zod';
import type { AemetMunicipality, WeatherData } from '@/lib/types';
import { AemetWeatherPredictionSchema } from '@/lib/types';

const AEMET_API_KEY = process.env.AEMET_API_KEY;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

const AEMET_API_URL = 'https://opendata.aemet.es/opendata/api';
const OPENWEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';


// Main function to get formatted weather data from AEMET
export async function getAemetWeatherData(municipality: AemetMunicipality): Promise<WeatherData> {
  if (!AEMET_API_KEY) {
    throw new Error('AEMET_API_KEY is not defined in the environment variables.');
  }
  try {
    const predictionUrl = `${AEMET_API_URL}/prediccion/especifica/municipio/diaria/${municipality.id.substring(2)}`;
    const rawData = await fetchAemet(predictionUrl);
    
    if (!rawData || !rawData[0]) {
        throw new Error("Invalid weather data received from AEMET");
    }

    const validatedWeather = AemetWeatherPredictionSchema.parse(rawData[0]);
    const today = validatedWeather.prediccion.dia[0];
    const forecastDays = validatedWeather.prediccion.dia.slice(1, 6);

    const windSpeeds = today.viento.map(v => v.velocidad);
    const averageWindSpeed = windSpeeds.length > 0 ? Math.round(windSpeeds.reduce((sum, speed) => sum + speed, 0) / windSpeeds.length) : 0;
    
    const conditionToday = today.estadoCielo.find(e => e.periodo === "12-24") ?? today.estadoCielo.find(e => e.periodo === "00-24") ?? today.estadoCielo[0];

    return {
      location: {
        city: validatedWeather.nombre,
        country: validatedWeather.provincia,
      },
      current: {
        temperature: Math.round((today.temperatura.maxima + today.temperatura.minima) / 2),
        conditionCode: conditionToday.value,
        windSpeed: averageWindSpeed,
        humidity: Math.round((today.humedadRelativa.maxima + today.humedadRelativa.minima) / 2),
      },
      forecast: forecastDays.map((day) => {
        const conditionForecast = day.estadoCielo.find(e => e.periodo === "12-24") ?? day.estadoCielo.find(e => e.periodo === "00-24") ?? day.estadoCielo[0];
        return {
         day: day.fecha,
         temperature: Math.round((day.temperatura.maxima + day.temperatura.minima) / 2),
         conditionCode: day.estadoCielo[0].value, // Simplified for now
        }
      }),
    };
  } catch (error) {
    console.error('Error processing AEMET data:', error);
    throw new Error('Failed to process weather data from AEMET.');
  }
}

// Helper to fetch from AEMET API
async function fetchAemet(url: string) {
  const initialResponse = await fetch(url, { headers: { 'api_key': AEMET_API_KEY!, 'Accept': 'application/json' } });

  if (!initialResponse.ok) {
    if (initialResponse.status === 429) throw new Error("AEMET API rate limit exceeded.");
    throw new Error(`AEMET API initial request failed: ${initialResponse.status}`);
  }
  
  const initialData = await initialResponse.json() as any;
  if (initialData.estado !== 200) throw new Error(`AEMET API Error: ${initialData.descripcion}`);

  const dataResponse = await fetch(initialData.datos);
  if (!dataResponse.ok) throw new Error(`Failed to fetch data from ${initialData.datos}: ${dataResponse.status}`);

  const responseText = await dataResponse.text();
  const cleanResponseText = responseText.trim().replace(/^[\u200B-\u200D\uFEFF]/, '');
  return JSON.parse(cleanResponseText);
}


// --- OpenWeatherMap Fallback ---

const aemetToOpenWeatherConditionMap: { [key: string]: string } = {
  '11': 'Clear', '11n': 'Clear', // Despejado
  '12': 'Clouds', '12n': 'Clouds', // Poco nuboso
  '13': 'Clouds', '13n': 'Clouds', // Intervalos nubosos
  '14': 'Clouds', '14n': 'Clouds', // Nuboso
  '15': 'Clouds', '15n': 'Clouds', // Muy nuboso
  '16': 'Clouds', '16n': 'Clouds', // Cubierto
  '17': 'Clouds', '17n': 'Clouds', // Nubes altas
  '43': 'Rain', '43n': 'Rain', // Lluvia escasa
  '44': 'Rain', '44n': 'Rain', // Lluvia
  '45': 'Rain', '45n': 'Rain', // Lluvia fuerte
  '23': 'Rain', '23n': 'Rain',
  '24': 'Rain', '24n': 'Rain',
  '25': 'Rain', '25n': 'Rain',
  '51': 'Mist', '51n': 'Mist', // Bruma/Niebla
  '52': 'Fog', '52n': 'Fog',
  '53': 'Fog', '53n': 'Fog',
  '54': 'Fog', '54n': 'Fog',
  '33': 'Snow', '33n': 'Snow', // Nieve
  '34': 'Snow', '34n': 'Snow',
  '35': 'Snow', '35n': 'Snow',
  '61': 'Thunderstorm', '61n': 'Thunderstorm', // Tormenta
  '62': 'Thunderstorm', '62n': 'Thunderstorm',
  '63': 'Thunderstorm', '63n': 'Thunderstorm',
  '71': 'Snow', '71n': 'Snow', // Aguanieve (Treat as snow)
  '72': 'Snow', '72n': 'Snow',
  '73': 'Snow', '73n': 'Snow',
};

// Main function to get and format data from OpenWeatherMap
export async function getOpenWeatherData(location: string): Promise<WeatherData> {
  if (!OPENWEATHER_API_KEY) {
    throw new Error('OPENWEATHER_API_KEY is not defined in the environment variables.');
  }

  // Fetch current weather and forecast in parallel
  const [currentWeatherRes, forecastRes] = await Promise.all([
    fetch(`${OPENWEATHER_API_URL}/weather?q=${location}&units=metric&appid=${OPENWEATHER_API_KEY}`),
    fetch(`${OPENWEATHER_API_URL}/forecast?q=${location}&units=metric&appid=${OPENWEATHER_API_KEY}`)
  ]);

  if (!currentWeatherRes.ok) throw new Error(`OpenWeatherMap current weather request failed: ${currentWeatherRes.status}`);
  if (!forecastRes.ok) throw new Error(`OpenWeatherMap forecast request failed: ${forecastRes.status}`);

  const current = await currentWeatherRes.json() as any;
  const forecast = await forecastRes.json() as any;
  
  // Create a map to get one forecast per day (OpenWeather gives 3-hour intervals)
  const dailyForecasts = new Map<string, any>();
  forecast.list.forEach((item: any) => {
    const date = item.dt_txt.split(' ')[0]; // Get 'YYYY-MM-DD'
    if (!dailyForecasts.has(date)) {
        dailyForecasts.set(date, item);
    }
  });
  // Remove today from forecast
  const todayKey = new Date(current.dt * 1000).toISOString().split('T')[0];
  dailyForecasts.delete(todayKey);


  return {
    location: {
      city: current.name,
      country: current.sys.country,
    },
    current: {
      temperature: Math.round(current.main.temp),
      conditionCode: aemetToOpenWeatherConditionMap[current.weather[0].id] || current.weather[0].main,
      windSpeed: Math.round(current.wind.speed * 3.6), // m/s to km/h
      humidity: current.main.humidity,
    },
    forecast: Array.from(dailyForecasts.values()).slice(0, 5).map((day: any) => ({
      day: day.dt_txt.split(' ')[0],
      temperature: Math.round(day.main.temp),
      conditionCode: aemetToOpenWeatherConditionMap[day.weather[0].id] || day.weather[0].main,
    })),
  };
}
