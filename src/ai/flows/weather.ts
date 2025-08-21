'use server';
/**
 * @fileOverview A weather-checking AI agent that uses real data from AEMET.
 *
 * - getWeather - A function that gets the weather for a location.
 * - WeatherData - The return type for the getWeather function.
 * - WeatherInput - The input type for the getWeather function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getAemetWeatherData } from '@/services/aemet';

// Zod Schema for data validation, moved from aemet.ts to avoid 'use server' export issues.
const AemetMunicipality = z.object({
  id: z.string(),
  nombre: z.string(),
});


// Input and Output Schemas
const WeatherInputSchema = z.object({
  location: z.string().describe('The location to get the weather for.'),
});
export type WeatherInput = z.infer<typeof WeatherInputSchema>;

const WeatherDataSchema = z.object({
  location: z.object({
    city: z.string().describe('The city name.'),
    country: z.string().describe('The country code.'),
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
  ).describe('A weather forecast for the next few days.'),
  maps: z.object({
    cloud: z.string().describe("A URL to the cloud radar map from AEMET."),
    heat: z.string().describe("A URL to the temperature map from AEMET."),
  }),
});
export type WeatherData = z.infer<typeof WeatherDataSchema>;


// Tool to get real weather data from AEMET service
const getRealWeatherData = ai.defineTool(
  {
    name: 'getRealWeatherData',
    description: 'Get real-time weather data for a specified location in Spain.',
    inputSchema: z.object({
        municipality: AemetMunicipality.describe("The Spanish municipality to get weather for.")
    }),
    outputSchema: WeatherDataSchema,
  },
  async ({municipality}) => {
    console.log(`Getting weather for ${municipality.nombre}`);
    return await getAemetWeatherData(municipality);
  }
);


// Main exported function that clients will call
export async function getWeather(input: WeatherInput): Promise<WeatherData> {
  const result = await weatherFlow(input);
  return result;
}


// The Genkit Flow
const weatherFlow = ai.defineFlow(
  {
    name: 'weatherFlow',
    inputSchema: WeatherInputSchema,
    outputSchema: WeatherDataSchema,
    system: `
      You are a helpful weather assistant for a hiking club in Spain.
      Your goal is to provide accurate weather reports using the available tools.
      The user will provide a location name. You must determine the correct municipality and use the tool to fetch the weather data.
      If the user provides a well-known location like "Sierra Nevada", you should choose the most representative municipality. For "Sierra Nevada", use "Monachil". For "Granada", use "Granada".
      Present the data clearly to the user.
    `,
    tools: [getRealWeatherData],
  },
  async (input) => {

    const llmResponse = await ai.generate({
      prompt: `Get the weather for ${input.location}`,
      model: 'googleai/gemini-1.5-flash-latest',
      tools: [getRealWeatherData],
      toolChoice: 'required',
    });

    const toolRequest = llmResponse.toolRequest();
    if (!toolRequest) {
        throw new Error("Expected the model to call the weather tool.");
    }
    
    // Extract the municipality from the tool request and call the tool
    const municipality = toolRequest.input.municipality as z.infer<typeof AemetMunicipality>;
    const toolResponse = await getRealWeatherData( {municipality} );

    return toolResponse;
  }
);
