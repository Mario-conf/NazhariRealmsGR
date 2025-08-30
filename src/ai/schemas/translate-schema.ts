/**
 * @fileOverview Zod schemas and TypeScript types for the translation flow.
 * This file does not use the 'use server' directive and can be safely
 * imported in client and server components.
 */

import { z } from 'zod';

// Zod schema for validating the structure of the rules content
export const RuleSpaceItemSchema = z.object({
  name: z.string(),
  fuego: z.string(),
  acampada: z.string(),
  pernocta: z.string(),
});

export const RuleContentSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  safety_title: z.string(),
  safety1_title: z.string(),
  safety1_content: z.string(),
  safety2_title: z.string(),
  safety2_content: z.string(),
  safety3_title: z.string(),
  safety3_content: z.string(),
  lnt_title: z.string(),
  lnt1_trigger: z.string(),
  lnt1_content: z.string(),
  lnt2_trigger: z.string(),
  lnt2_content: z.string(),
  lnt3_trigger: z.string(),
  lnt3_content: z.string(),
  lnt4_trigger: z.string(),
  lnt4_content: z.string(),
  etiquette_title: z.string(),
  etiquette1_title: z.string(),
  etiquette1_content: z.string(),
  etiquette2_title: z.string(),
  etiquette2_content: z.string(),
  etiquette3_title: z.string(),
  etiquette3_content: z.string(),
  spaces_title: z.string(),
  spaces_list: z.array(RuleSpaceItemSchema),
});
export type RuleContent = z.infer<typeof RuleContentSchema>;


// Schema for the translation flow input
export const TranslateRuleContentInputSchema = z.object({
  jsonContent: RuleContentSchema,
  targetLanguage: z.string().describe('The target language code (e.g., "en", "es", "fr").'),
});
export type TranslateRuleContentInput = z.infer<typeof TranslateRuleContentInputSchema>;
