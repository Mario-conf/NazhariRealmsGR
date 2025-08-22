'use server';
/**
 * @fileOverview Server action to fetch weather data directly from AEMET.
 */
import {
  getAemetWeatherData,
  fetchData,
} from '@/services/aemet';
import { z } from 'zod';
import type { WeatherData, AemetMunicipality } from '@/lib/types';
import { AemetMunicipalitySchema } from '@/lib/types';

export type { WeatherData };

const WeatherInputSchema = z.object({
  location: z.string(),
});

export type WeatherResult = WeatherData | { error: 'invalid_input' | 'location_not_found' | 'service_unavailable' | 'unknown_error', location?: string };


const SPECIAL_CASES: Record<string, string> = {
  'sierra nevada': 'Monachil',
};

async function findMunicipality(
  locationName: string
): Promise<AemetMunicipality | null> {
  const normalizedLocation = locationName.toLowerCase().trim();
  const searchName = SPECIAL_CASES[normalizedLocation] || normalizedLocation;

  const municipalitiesUrl =
    'https://opendata.aemet.es/opendata/api/maestro/municipios';
  const municipalities = await fetchData(municipalitiesUrl);

  const municipalitiesParsed = z.array(AemetMunicipalitySchema).safeParse(municipalities);
  if (!municipalitiesParsed.success) {
      console.error("Failed to parse municipalities list", municipalitiesParsed.error);
      return null;
  }

  const found = municipalitiesParsed.data.find(
    (m) => m.nombre.toLowerCase() === searchName.toLowerCase()
  );

  return found || null;
}

export async function getWeatherForLocation(
  input: z.infer<typeof WeatherInputSchema>
): Promise<WeatherResult> {
  const parsedInput = WeatherInputSchema.safeParse(input);
  if (!parsedInput.success) {
    return { error: 'invalid_input' };
  }

  const location = parsedInput.data.location;

  try {
    const municipality = await findMunicipality(location);

    if (!municipality) {
      return { error: 'location_not_found', location };
    }

    const weatherData = await getAemetWeatherData(municipality);
    return weatherData;
  } catch (error) {
    console.error(`Failed to get weather for ${location}:`, error);
    if (error instanceof Error && error.message.includes('socket hang up')) {
      return { error: 'service_unavailable' };
    }
    return { error: 'unknown_error' };
  }
}
