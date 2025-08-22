
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getWeatherForLocation, WeatherData, WeatherResult } from '@/actions/weather';
import { SunIcon, ThermometerIcon, WindIcon, Droplets } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import type { Metadata } from 'next';


// No se puede exportar Metadata en un client component.
// Esto debe hacerse en el layout o en un server component padre si fuera necesario.
// Por ahora, el SEO se manejará globalmente en el layout.tsx principal.

export default function WeatherPage() {
  const t = useTranslations('WeatherPage');
  const tConditions = useTranslations('WeatherConditions');
  const locale = useLocale();
  const [location, setLocation] = useState('Sierra Nevada');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getErrorMessage = (errorResult: { error: string, location?: string }) => {
    switch (errorResult.error) {
      case 'location_not_found':
        return t('errors.location_not_found', { location: errorResult.location });
      case 'service_unavailable':
        return t('errors.service_unavailable');
      case 'unknown_error':
        return t('errors.unknown_error');
      default:
        return t('errors.unknown_error');
    }
  }

  const handleSearch = async (searchLocation: string) => {
    if (!searchLocation) {
      setError(t('error_location'));
      return;
    }
    setLoading(true);
    setError(null);
    setWeatherData(null);
    
    const data: WeatherResult = await getWeatherForLocation({ location: searchLocation });
    
    if ('error' in data) {
      setError(getErrorMessage(data));
      setWeatherData(null);
    } else {
      setWeatherData(data);
      setError(null);
    }
    setLoading(false);
  };

  const getDayOfWeek = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, { weekday: 'long' });
  }

  // AEMET condition codes can be complex.
  // We extract the base code to get the main condition.
  const getConditionTranslation = (code: string) => {
    const baseCode = code.slice(0, 2);
    // The key must be a string literal for useTranslations, so we check if it exists.
    // Fallback to the code itself if no translation is found.
    return tConditions.rich(baseCode, {}).toString() !== baseCode ? tConditions(baseCode) : code;
  }

  // Fetch weather for default location on initial render
  useEffect(() => {
    handleSearch('Sierra Nevada');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-4xl font-bold tracking-tighter sm:text-5xl">
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
            onKeyUp={(e) => e.key === 'Enter' && handleSearch(location)}
            className="flex-1"
          />
          <Button onClick={() => handleSearch(location)} disabled={loading}>
            {loading ? t('search_button_loading') : t('search_button')}
          </Button>
        </div>
      </div>

      <div className="mt-12">
        {loading && (
            <div className="text-center py-12">
                <p className="text-lg">{t('loading_text', {location})}</p>
            </div>
        )}

        {error && !loading && (
            <div className="text-center py-12">
                 <p className="mt-2 text-center text-destructive text-lg">{error}</p>
            </div>
        )}

        {weatherData && !loading && (
            <div className="animate-in fade-in duration-500">
            <Card>
                <CardHeader>
                <CardTitle className="font-serif text-center text-3xl">
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
                <div className="flex flex-col items-center gap-2 text-center">
                    <SunIcon className="h-10 w-10 text-primary" />
                    <p className="text-xl font-semibold capitalize">
                    {getConditionTranslation(weatherData.current.conditionCode)}
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
                <h2 className="font-serif text-2xl font-bold tracking-tighter text-center">
                {t('forecast_title')}
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
                {weatherData.forecast.map((day, index) => (
                    <Card key={index} className="text-center">
                    <CardHeader>
                        <CardTitle className="text-lg capitalize">{getDayOfWeek(day.day)}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-2">
                        <SunIcon className="h-8 w-8 text-amber-400" />
                        <p className="text-2xl font-bold">{day.temperature}°C</p>
                        <p className="text-sm text-muted-foreground capitalize break-words">{getConditionTranslation(day.conditionCode)}</p>
                    </CardContent>
                    </Card>
                ))}
                </div>
            </div>
            </div>
        )}
      </div>

    </div>
  );
}
