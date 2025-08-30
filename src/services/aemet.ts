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

// Maps OpenWeather 'id' to AEMET 'value'
const openWeatherToAemetCodeMap: { [key: number]: string } = {
  // Thunderstorm
  200: '61', 201: '61', 202: '63', 210: '61', 211: '62', 212: '63', 221: '63', 230: '61', 231: '61', 232: '63',
  // Drizzle
  300: '43', 301: '43', 302: '44', 310: '43', 311: '43', 312: '44', 313: '44', 314: '45', 321: '44',
  // Rain
  500: '23', 501: '24', 502: '25', 503: '25', 504: '25', 511: '71', 520: '43', 521: '44', 522: '45', 531: '45',
  // Snow
  600: '33', 601: '34', 602: '35', 611: '71', 612: '71', 613: '71', 615: '71', 616: '71', 620: '33', 621: '34', 622: '35',
  // Atmosphere (Mist, Fog, etc.)
  701: '51', 711: '51', 721: '51', 731: '51', 741: '52', 751: '51', 761: '51', 762: '51', 771: '51', 781: '51',
  // Clear
  800: '11',
  // Clouds
  801: '12', 802: '13', 803: '14', 804: '16',
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
    // Get forecast for midday
    if (!dailyForecasts.has(date) && item.dt_txt.includes('12:00:00')) {
        dailyForecasts.set(date, item);
    }
  });
  // If no midday forecast, take the first available for each day
  forecast.list.forEach((item: any) => {
    const date = item.dt_txt.split(' ')[0]; // Get 'YYYY-MM-DD'
    if (!dailyForecasts.has(date)) {
        dailyForecasts.set(date, item);
    }
  });
  
  // Remove today from forecast
  const todayKey = new Date(current.dt * 1000).toISOString().split('T')[0];
  dailyForecasts.delete(todayKey);

  const getAemetCode = (owmId: number) => openWeatherToAemetCodeMap[owmId] || '11'; // Default to clear sky


  return {
    location: {
      city: current.name,
      country: current.sys.country,
    },
    current: {
      temperature: Math.round(current.main.temp),
      conditionCode: getAemetCode(current.weather[0].id),
      windSpeed: Math.round(current.wind.speed * 3.6), // m/s to km/h
      humidity: current.main.humidity,
    },
    forecast: Array.from(dailyForecasts.values()).slice(0, 5).map((day: any) => ({
      day: day.dt_txt.split(' ')[0],
      temperature: Math.round(day.main.temp),
      conditionCode: getAemetCode(day.weather[0].id),
    })),
  };
}
