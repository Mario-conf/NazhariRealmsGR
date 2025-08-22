import { z } from 'zod';

// Zod Schemas for AEMET data validation
export const AemetMunicipalitySchema = z.object({
  id: z.string(),
  nombre: z.string(),
});
export type AemetMunicipality = z.infer<typeof AemetMunicipalitySchema>;


export const AemetWeatherPredictionSchema = z.object({
  elaborado: z.string(),
  nombre: z.string(),
  provincia: z.string(),
  prediccion: z.object({
    dia: z.array(
      z.object({
        fecha: z.string(),
        estadoCielo: z.array(z.object({ value: z.string(), descripcion: z.string(), periodo: z.string().optional() })).nonempty(),
        temperatura: z.object({
          maxima: z.number(),
          minima: z.number(),
        }),
        viento: z.array(z.object({ direccion: z.string(), velocidad: z.number(), periodo: z.string().optional() })).nonempty(),
        humedadRelativa: z.object({
          maxima: z.number(),
          minima: z.number(),
        }),
      })
    ),
  }),
});

export const WeatherDataSchema = z.object({
  location: z.object({
    city: z.string().describe('The city name.'),
    country: z.string().describe('The country code.'),
  }),
  current: z.object({
    temperature: z.number().describe('The current temperature in Celsius.'),
    conditionCode: z.string().describe('The weather condition code from AEMET.'),
    windSpeed: z.number().describe('The wind speed in km/h.'),
    humidity: z.number().describe('The humidity percentage.'),
  }),
  forecast: z.array(
    z.object({
      day: z.string().describe('The date string.'),
      temperature: z.number().describe('The forecasted temperature in Celsius.'),
      conditionCode: z.string().describe('The forecasted weather condition code.'),
    })
  ).describe('A weather forecast for the next few days.'),
});
export type WeatherData = z.infer<typeof WeatherDataSchema>;
