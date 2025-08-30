'use server';
/**
 * @fileOverview A Genkit flow for translating text.
 *
 * - translateText - A function that translates text to a target language.
 */

import { ai } from '@/ai/genkit';
import {
  TranslateInputSchema,
  TranslateOutputSchema,
  type TranslateInput,
} from '@/ai/schemas/translate-schema';

export async function translateText(
  input: TranslateInput
): Promise<z.infer<typeof TranslateOutputSchema>> {
  // Don't translate if the target language is the same as the source (Spanish)
  if (input.targetLanguage === 'es') {
    return { translatedText: input.text };
  }
  return translateTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateTextPrompt',
  input: { schema: TranslateInputSchema },
  output: { schema: TranslateOutputSchema },
  prompt: `
    You are an expert translator. Translate the following text into the language with the code '{{targetLanguage}}'.

    Important rules:
    - Preserve the HTML tags and structure exactly as they are in the original text.
    - Only translate the content within the HTML tags.
    - Do not add or remove any HTML tags.
    - Ensure the output is a valid HTML snippet.

    Text to translate:
    \`\`\`html
    {{{text}}}
    \`\`\`
  `,
});

const translateTextFlow = ai.defineFlow(
  {
    name: 'translateTextFlow',
    inputSchema: TranslateInputSchema,
    outputSchema: TranslateOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
