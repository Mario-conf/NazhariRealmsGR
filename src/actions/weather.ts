'use server';
/**
 * @fileOverview Server action to fetch weather data.
 * It fetches data from AEMET and OpenWeatherMap and merges them,
 * giving priority to AEMET and averaging numerical values.
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
    const response = await fetch(municipalitiesUrl, { headers: { 'api_key': process.env.AEMET_API_KEY!, 'Accept': 'application/json' } }).catch(error => {
      // Intentionally ignore response text decoding error if it's not valid JSON
      // as AEMET sometimes returns non-JSON responses on this endpoint.
      // We handle the case where municipalities is not an array below.
      return new Response(null, { status: 500 });
    });
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
  
  let aemetData: WeatherData | null = null;
  let openWeatherData: WeatherData | null = null;

  // --- Fetch from both sources in parallel ---
  const aemetPromise = (async () => {
    try {
      const municipality = await findAemetMunicipality(location);
      if (municipality) {
        return await getAemetWeatherData(municipality);
      }
      console.warn(`AEMET municipality not found for "${location}".`);
      return null;
    } catch (error) {
      console.error(`AEMET request for "${location}" failed:`, error);
      return null;
    }
  })();
  
  const openWeatherPromise = getOpenWeatherData(location).catch(error => {
    console.error(`OpenWeatherMap request for "${location}" failed:`, error);
    return null;
  });

  [aemetData, openWeatherData] = await Promise.all([aemetPromise, openWeatherPromise]);
  
  // --- Process results ---
  
  if (aemetData) {
    if (openWeatherData) {
      // Both sources available: merge them, AEMET has priority
      const mergedData: WeatherData = {
        location: aemetData.location, // AEMET location is more specific
        current: {
          temperature: Math.round((aemetData.current.temperature + openWeatherData.current.temperature) / 2),
          conditionCode: aemetData.current.conditionCode, // AEMET condition is priority
          windSpeed: Math.round((aemetData.current.windSpeed + openWeatherData.current.windSpeed) / 2),
          humidity: Math.round((aemetData.current.humidity + openWeatherData.current.humidity) / 2),
        },
        forecast: aemetData.forecast.map((aemetDay, index) => {
          const owmDay = openWeatherData!.forecast[index];
          if (owmDay) {
            return {
              day: aemetDay.day, // AEMET date
              temperature: Math.round((aemetDay.temperature + owmDay.temperature) / 2),
              conditionCode: aemetDay.conditionCode, // AEMET condition
            };
          }
          return aemetDay; // Fallback to AEMET day if no corresponding OWM day
        }),
      };
      return mergedData;
    } else {
      // Only AEMET is available
      return aemetData;
    }
  } else if (openWeatherData) {
    // Only OpenWeatherMap is available
    return openWeatherData;
  } else {
    // Both failed
    return { error: 'service_unavailable', location };
  }
}
