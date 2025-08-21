'use server';
/**
 * @fileOverview A weather-checking AI agent.
 *
 * - getWeather - A function that gets the weather for a location.
 * - WeatherData - The return type for the getWeather function.
 * - WeatherInput - The input type for the getWeather function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const WeatherInputSchema = z.object({
  location: z.string().describe('The location to get the weather for.'),
});
export type WeatherInput = z.infer<typeof WeatherInputSchema>;

const WeatherDataSchema = z.object({
  location: z.object({
    city: z.string().describe('The city name.'),
    country: z.string().describe('The country name.'),
  }),
  current: z.object({
    temperature: z.number().describe('The current temperature in Celsius.'),
    condition: z.string().describe('The current weather condition.'),
    windSpeed: z.number().describe('The wind speed in km/h.'),
    humidity: z.number().describe('The humidity percentage.'),
  }),
  forecast: z.array(
    z.object({
      day: z.string().describe('The day of the week.'),
      temperature: z.number().describe('The forecasted temperature in Celsius.'),
      condition: z.string().describe('The forecasted weather condition.'),
    })
  ).length(5).describe('A 5-day weather forecast.'),
  maps: z.object({
    cloud: z.string().describe("A base64 encoded PNG image of the cloud radar map. Use a visually interesting and varied map with some cloud cover."),
    heat: z.string().describe("A base64 encoded PNG image of the heat map. Use a visually interesting and varied map with a clear heat distribution."),
  }),
});
export type WeatherData = z.infer<typeof WeatherDataSchema>;

export async function getWeather(input: WeatherInput): Promise<WeatherData> {
  const weather = await weatherFlow(input);
  const [cloudMap, heatMap] = await Promise.all([
    mapFlow({
      mapType: 'cloud',
      location: weather.location.city,
    }),
    mapFlow({
      mapType: 'heat',
      location: weather.location.city,
    }),
  ]);
  return { ...weather, maps: { cloud: cloudMap, heat: heatMap } };
}

const weatherPrompt = ai.definePrompt({
  name: 'weatherPrompt',
  input: { schema: WeatherInputSchema },
  output: { schema: WeatherDataSchema },
  prompt: `
    You are a helpful weather assistant.
    Provide a realistic and detailed weather report for the given location: {{{location}}}.
    Fill out all fields in the output schema.
    For the day field in the forecast, use the names of the next 5 days of the week (e.g., Monday, Tuesday).
    Do not generate the map fields, they will be handled by another service.
  `,
});

const weatherFlow = ai.defineFlow(
  {
    name: 'weatherFlow',
    inputSchema: WeatherInputSchema,
    outputSchema: WeatherDataSchema,
  },
  async (input) => {
    const { output } = await weatherPrompt(input);
    return output!;
  }
);

const mapFlow = ai.defineFlow(
  {
    name: 'mapFlow',
    inputSchema: z.object({
      mapType: z.enum(['cloud', 'heat']),
      location: z.string(),
    }),
    outputSchema: z.string(),
  },
  async ({ mapType, location }) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a satellite-style weather radar map. The map should be visually appealing and represent a plausible weather pattern.
      Do not include any text, labels, or legends on the map itself.
      Map type: ${mapType} map for ${location}.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });
    return media.url.split(',')[1];
  }
);
