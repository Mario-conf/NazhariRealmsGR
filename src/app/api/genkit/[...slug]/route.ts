
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { nextHandler } from '@genkit-ai/next';

import '@/ai/dev';

genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});

export const POST = nextHandler();
