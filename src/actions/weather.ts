'use server';
/**
 * @fileOverview Server action to fetch weather data directly from AEMET.
 */
import {
  getAemetWeatherData,
  fetchData,
  AemetMunicipalitySchema,
  WeatherDataSchema,
} from '@/services/aemet';
import { z } from 'zod';
import type { WeatherData } from '@/services/aemet';

export type { WeatherData };

const WeatherInputSchema = z.object({
  location: z.string(),
});

const SPECIAL_CASES: Record<string, string> = {
  'sierra nevada': 'Monachil',
};

async function findMunicipality(
  locationName: string
): Promise<z.infer<typeof AemetMunicipalitySchema> | null> {
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
): Promise<WeatherData | { error: string }> {
  const parsedInput = WeatherInputSchema.safeParse(input);
  if (!parsedInput.success) {
    return { error: 'Invalid input.' };
  }

  try {
    const municipality = await findMunicipality(parsedInput.data.location);

    if (!municipality) {
      return { error: `Location '${parsedInput.data.location}' not found.` };
    }

    const weatherData = await getAemetWeatherData(municipality);
    return weatherData;
  } catch (error) {
    console.error(`Failed to get weather for ${input.location}:`, error);
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred.';
    return { error: message };
  }
}
