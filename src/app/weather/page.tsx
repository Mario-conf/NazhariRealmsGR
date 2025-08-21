'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getWeather, WeatherData } from '@/ai/flows/weather';
import { CloudIcon, SunIcon, ThermometerIcon, WindIcon, Droplets } from 'lucide-react';

export default function WeatherPage() {
  const [location, setLocation] = useState('Sierra Nevada, Granada');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!location) {
      setError('Por favor, introduce una ubicación.');
      return;
    }
    setLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const data = await getWeather({ location });
      setWeatherData(data);
    } catch (err) {
      setError('No se pudieron obtener los datos del tiempo. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch weather for default location on initial render
  useState(() => {
    handleSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  });


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Centro Meteorológico
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Obtén pronósticos del tiempo en tiempo real y mapas de radar para cualquier ubicación. Planifica tus aventuras con confianza.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-xl">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Introduce una ciudad o código postal"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar'}
          </Button>
        </div>
        {error && <p className="mt-2 text-center text-red-500">{error}</p>}
      </div>

      {loading && !weatherData && (
         <div className="text-center py-12">
          <p className="text-lg">Cargando datos para {location}...</p>
        </div>
      )}

      {weatherData && (
        <div className="mt-12 animate-in fade-in duration-500">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-3xl">
                Tiempo actual en {weatherData.location.city},{' '}
                {weatherData.location.country}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="flex flex-col items-center gap-2">
                <ThermometerIcon className="h-10 w-10 text-primary" />
                <p className="text-4xl font-bold">
                  {weatherData.current.temperature}°C
                </p>
                <p className="text-muted-foreground">Temperatura</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <SunIcon className="h-10 w-10 text-primary" />
                <p className="text-2xl font-semibold text-center">
                  {weatherData.current.condition}
                </p>
                <p className="text-muted-foreground">Condición</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <WindIcon className="h-10 w-10 text-primary" />
                <p className="text-2xl font-semibold">
                  {weatherData.current.windSpeed} km/h
                </p>
                <p className="text-muted-foreground">Viento</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Droplets className="h-10 w-10 text-primary" />
                <p className="text-2xl font-semibold">
                  {weatherData.current.humidity}%
                </p>
                <p className="text-muted-foreground">Humedad</p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h2 className="text-2xl font-bold tracking-tighter text-center">
              Pronóstico para 5 días
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
              {weatherData.forecast.map((day, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <CardTitle className="text-lg">{day.day}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center gap-2">
                    <SunIcon className="h-8 w-8 text-amber-400" />
                    <p className="text-2xl font-bold">{day.temperature}°C</p>
                    <p className="text-muted-foreground">{day.condition}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold tracking-tighter text-center">
              Mapas de Radar
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Radar de Nubes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
                    <img
                      src={`data:image/png;base64,${weatherData.maps.cloud}`}
                      alt="Mapa de Radar de Nubes"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Mapa de Calor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
                    <img
                      src={`data:image/png;base64,${weatherData.maps.heat}`}
                      alt="Mapa de Calor"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
