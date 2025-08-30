'use server';
/**
 * @fileOverview Server action for fetching trail data.
 * This version uses dynamic imports to ensure JSON files are correctly
 * bundled with the application for serverless environments.
 */
import type { Trail } from '@/lib/trail-data';
import { z } from 'zod';

const GetTrailsInputSchema = z.object({
  locale: z.string(),
});

type TrailDataModule = {
  default: {
    trails: Trail[];
  };
};

/**
 * Fetches trail data from the corresponding JSON file based on locale
 * using dynamic imports.
 * Falls back to Spanish ('es') if the JSON for the requested locale doesn't exist.
 * @param {object} input - The input object.
 * @param {string} input.locale - The desired locale for the trail data.
 * @returns {Promise<Trail[]>} A promise that resolves to an array of trail objects.
 */
export async function getTrails(
  input: z.infer<typeof GetTrailsInputSchema>
): Promise<Trail[]> {
  const parsedInput = GetTrailsInputSchema.safeParse(input);
  if (!parsedInput.success) {
    throw new Error('Invalid input for getTrails');
  }

  const { locale } = parsedInput.data;
  let trailDataModule: TrailDataModule;

  try {
    // Use a switch to handle dynamic imports, which is more robust
    // for bundlers like Next.js/Webpack.
    switch (locale) {
      case 'en':
        trailDataModule = await import('@/lib/data/trails.en.json');
        break;
      case 'de':
        trailDataModule = await import('@/lib/data/trails.de.json');
        break;
      case 'fr':
        trailDataModule = await import('@/lib/data/trails.fr.json');
        break;
      case 'it':
        trailDataModule = await import('@/lib/data/trails.it.json');
        break;
      case 'es':
      default:
        trailDataModule = await import('@/lib/data/trails.es.json');
        break;
    }
    return trailDataModule.default.trails;
  } catch (error) {
     console.error(`Failed to dynamically import trail data for locale "${locale}". Falling back to 'es'.`, error);
     try {
        trailDataModule = await import('@/lib/data/trails.es.json');
        return trailDataModule.default.trails;
     } catch (fallbackError) {
        console.error(`FATAL: Could not load fallback trail data (trails.es.json).`, fallbackError);
        throw new Error('Could not load any trail data.');
     }
  }
}
