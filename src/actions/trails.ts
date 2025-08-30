'use server';
/**
 * @fileOverview Server action for fetching trail data.
 */
import type { Trail } from '@/lib/trail-data';
import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

const GetTrailsInputSchema = z.object({
  locale: z.string(),
});

/**
 * Fetches trail data from the corresponding JSON file based on locale.
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
  const dataDirectory = path.join('public', 'data');
  
  let filePath = path.join(dataDirectory, `trails.${locale}.json`);

  try {
    await fs.access(filePath);
  } catch (error) {
    if (locale !== 'es') {
      console.warn(`Trail data for locale "${locale}" not found, falling back to "es".`);
      filePath = path.join(dataDirectory, `trails.es.json`);
    } else {
      console.error(`Default trail data file (trails.es.json) not found.`);
      throw new Error('Could not load trail data.');
    }
  }

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return data.trails as Trail[];
  } catch (error) {
    console.error(`Failed to read or parse trail data from ${filePath}:`, error);
    throw new Error('Failed to process trail data.');
  }
}
