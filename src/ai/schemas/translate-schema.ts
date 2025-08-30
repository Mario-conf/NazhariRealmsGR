/**
 * @fileOverview Zod schemas and TypeScript types for the translation flow.
 * This file does not use the 'use server' directive and can be safely
 * imported in client and server components.
 */

import { z } from 'zod';

export const TranslateInputSchema = z.object({
  text: z.string().describe('The text to translate.'),
  targetLanguage: z
    .string()
    .describe('The target language code (e.g., "en", "es", "fr").'),
});
export type TranslateInput = z.infer<typeof TranslateInputSchema>;

export const TranslateOutputSchema = z.object({
  translatedText: z.string().describe('The translated text.'),
});
export type TranslateOutput = z.infer<typeof TranslateOutputSchema>;
