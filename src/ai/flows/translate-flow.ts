'use server';
/**
 * @fileOverview A Genkit flow for translating a full JSON object of rules.
 */

import { ai } from '@/ai/genkit';
import {
  RuleContentSchema, // Import the Zod schema
  type RuleContent, // Import the TS type
  TranslateRuleContentInputSchema,
} from '@/ai/schemas/translate-schema';
import { z } from 'zod';

export async function translateRules(
  input: z.infer<typeof TranslateRuleContentInputSchema>
): Promise<RuleContent> {
  // Don't translate if the target language is the same as the source (Spanish)
  if (input.targetLanguage === 'es') {
    return input.jsonContent;
  }
  return translateRulesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateRulesPrompt',
  input: { schema: TranslateRuleContentInputSchema },
  output: { schema: RuleContentSchema }, // Output is the entire translated object
  prompt: `
    You are an expert translator specializing in hiking and nature conservation rules.
    Translate the following JSON object, which contains club rules, into the language with the code '{{targetLanguage}}'.

    Important rules for translation:
    - Translate all string values in the JSON object.
    - Preserve the original JSON structure, including all keys and nesting.
    - Ensure the output is a valid JSON object that conforms to the provided schema.
    - The content often refers to specific Spanish or Andalusian regulations; adapt the translation to be clear and natural in the target language while retaining the original meaning.

    JSON object to translate:
    \`\`\`json
    {{{jsonStringifiedContent}}}
    \`\`\`
  `,
});

const translateRulesFlow = ai.defineFlow(
  {
    name: 'translateRulesFlow',
    inputSchema: TranslateRuleContentInputSchema,
    outputSchema: RuleContentSchema,
  },
  async (input) => {
    // The prompt needs a stringified version of the JSON
    const promptInput = {
      ...input,
      jsonStringifiedContent: JSON.stringify(input.jsonContent, null, 2),
    };
    const { output } = await prompt(promptInput);
    return output!;
  }
);
