
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { nextHandler } from '@genkit-ai/next';

import '@/ai/dev';

genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-1.5-flash-latest',
});

export const POST = nextHandler();
