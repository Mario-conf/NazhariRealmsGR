'use server';
/**
 * @fileOverview Server action to fetch weather data.
 * It first tries AEMET, and on failure, falls back to OpenWeatherMap.
 */
import { getAemetWeatherData, getOpenWeatherData } from '@/services/aemet';
import { z } from 'zod';
import type { WeatherData, AemetMunicipality } from '@/lib/types';
import { AemetMunicipalitySchema, WeatherDataSchema } from '@/lib/types';

export type { WeatherData };

const WeatherInputSchema = z.object({
  location: z.string(),
});

export type WeatherResult =
  | WeatherData
  | {
      error: 'invalid_input' | 'location_not_found' | 'service_unavailable' | 'unknown_error';
      location?: string;
    };

async function findAemetMunicipality(
  locationName: string
): Promise<AemetMunicipality | null> {
  const normalizedLocation = locationName.toLowerCase().trim();
  const SPECIAL_CASES: Record<string, string> = {
    'sierra nevada': 'Monachil',
  };
  const searchName = SPECIAL_CASES[normalizedLocation] || normalizedLocation;

  // This endpoint is not part of the public API but contains the list of municipalities.
  // Using a more stable source if available is recommended.
  const municipalitiesUrl =
    'https://opendata.aemet.es/opendata/api/maestro/municipios';
  
  try {
    const response = await fetch(municierror => {
      // Intentionally ignore response text decoding error if it's not valid JSON
      // as AEMET sometimes returns non-JSON responses on this endpoint.
      // We handle the case where municipalities is not an array below.
    }));
    if (!response.ok) return null;

    const municipalities = await response.json();

    const municipalitiesParsed = z.array(AemetMunicipalitySchema).safeParse(municipalities);
    if (!municipalitiesParsed.success) {
      console.error(
        'Failed to parse AEMET municipalities list',
        municipalitiesParsed.error
      );
      return null;
    }

    const found = municipalitiesParsed.data.find(
      (m) => m.nombre.toLowerCase() === searchName.toLowerCase()
    );

    return found || null;
  } catch (error) {
     console.error("Failed to fetch or parse AEMET municipalities list:", error);
     return null;
  }
}


export async function getWeatherForLocation(
  input: z.infer<typeof WeatherInputSchema>
): Promise<WeatherResult> {
  const parsedInput = WeatherInputSchema.safeParse(input);
  if (!parsedInput.success) {
    return { error: 'invalid_input' };
  }

  const { location } = parsedInput.data;

  // --- Try AEMET First ---
  try {
    const municipality = await findAemetMunicipality(location);
    if (municipality) {
      const weatherData = await getAemetWeatherData(municipality);
      return weatherData;
    }
    // If municipality is not found, fall through to OpenWeatherMap
    console.warn(`AEMET municipality not found for "${location}". Falling back to OpenWeatherMap.`);
  } catch (error) {
    console.error(`AEMET request for "${location}" failed:`, error, "Falling back to OpenWeatherMap.");
    // Fall through to OpenWeatherMap on any AEMET error
  }

  // --- Fallback to OpenWeatherMap ---
  try {
    const openWeatherData = await getOpenWeatherData(location);
    return openWeatherData;
  } catch (error: any) {
    console.error(`OpenWeatherMap fallback for "${location}" also failed:`, error);
     if (error.message.includes('404')) {
        return { error: 'location_not_found', location };
     }
     if (error.message.includes('401')) {
        console.error("OpenWeatherMap API key is invalid or missing.");
        return { error: 'service_unavailable' };
     }
    return { error: 'unknown_error' };
  }
}
