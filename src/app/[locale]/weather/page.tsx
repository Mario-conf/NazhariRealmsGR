'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getWeather, WeatherData } from '@/ai/flows/weather';
import { CloudIcon, SunIcon, ThermometerIcon, WindIcon, Droplets } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function WeatherPage() {
  const t = useTranslations('WeatherPage');
  const [location, setLocation] = useState('Sierra Nevada, Granada');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!location) {
      setError(t('error_location'));
      return;
    }
    setLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const data = await getWeather({ location });
      setWeatherData(data);
    } catch (err) {
      setError(t('error_fetch'));
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
          {t('title')}
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          {t('subtitle')}
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-xl">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder={t('search_placeholder')}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? t('search_button_loading') : t('search_button')}
          </Button>
        </div>
        {error && <p className="mt-2 text-center text-red-500">{error}</p>}
      </div>

      {loading && !weatherData && (
         <div className="text-center py-12">
          <p className="text-lg">{t('loading_text', {location})}</p>
        </div>
      )}

      {weatherData && (
        <div className="mt-12 animate-in fade-in duration-500">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-3xl">
                {t('current_weather_title', {city: weatherData.location.city, country: weatherData.location.country})}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="flex flex-col items-center gap-2">
                <ThermometerIcon className="h-10 w-10 text-primary" />
                <p className="text-4xl font-bold">
                  {weatherData.current.temperature}°C
                </p>
                <p className="text-muted-foreground">{t('temperature')}</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <SunIcon className="h-10 w-10 text-primary" />
                <p className="text-2xl font-semibold text-center">
                  {weatherData.current.condition}
                </p>
                <p className="text-muted-foreground">{t('condition')}</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <WindIcon className="h-10 w-10 text-primary" />
                <p className="text-2xl font-semibold">
                  {weatherData.current.windSpeed} km/h
                </p>
                <p className="text-muted-foreground">{t('wind')}</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Droplets className="h-10 w-10 text-primary" />
                <p className="text-2xl font-semibold">
                  {weatherData.current.humidity}%
                </p>
                <p className="text-muted-foreground">{t('humidity')}</p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h2 className="text-2xl font-bold tracking-tighter text-center">
              {t('forecast_title')}
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
              {t('radar_maps_title')}
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t('cloud_radar')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
                    <img
                      src={`data:image/png;base64,${weatherData.maps.cloud}`}
                      alt={t('cloud_radar_alt')}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{t('heat_map')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
                    <img
                      src={`data:image/png;base64,${weatherData.maps.heat}`}
                      alt={t('heat_map_alt')}
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
