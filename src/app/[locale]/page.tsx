'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { StarIcon, ShieldCheck, Mountain, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/navigation';

export default function Home() {
  const t = useTranslations('HomePage');

  const sponsors = Array.from({ length: 8 }).map((_, index) => ({
    id: index,
    src: `https://placehold.co/300x150.png`,
    alt: `Sponsor Logo ${index + 1}`,
  }));
  
  const features = [
    {
      icon: <Mountain className="w-8 h-8 text-primary" />,
      title: "Rutas para todos",
      description: "Desde paseos sencillos para familias hasta desafíos de alta montaña para los más experimentados. Siempre hay una aventura esperándote."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Comunidad de Aventureros",
      description: "Conecta con personas apasionadas por la naturaleza. Comparte experiencias, aprende de otros y haz amigos para toda la vida."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Seguridad y Guías Expertos",
      description: "Nuestros guías titulados garantizan tu seguridad en todo momento. Organizamos cada ruta pensando en el bienestar del grupo."
    }
  ];

  return (
    <div className="flex-1 bg-gradient-to-b from-papaya-start via-off-white to-footer-dark">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white overflow-hidden">
         <Image
            alt="Paisaje de montaña épico"
            src="https://placehold.co/1920x1080.png"
            data-ai-hint="paisaje montaña épico amanecer"
            fill
            className="object-cover -z-10 brightness-75"
          />
          <div className="container px-4 md:px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
             <div className="max-w-3xl mx-auto">
                <h1 className="font-serif text-4xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl drop-shadow-lg">
                    EXPLORA. SUEÑA. DESCUBRE.
                </h1>
                <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
                   Tu aventura en las montañas de Granada y Andalucía empieza aquí. Únete a una comunidad que vive la naturaleza.
                </p>
                <div className="mt-8">
                    <Button asChild size="lg">
                        <Link href="/routes">{t('explore_routes')}</Link>
                    </Button>
                </div>
            </div>
          </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="grid gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <div className="flex-shrink-0">{feature.icon}</div>
                            <div>
                                <h3 className="text-xl font-bold font-serif">{feature.title}</h3>
                                <p className="text-muted-foreground mt-1">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="relative aspect-square md:aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
                     <Image
                        alt="Senderista mirando un mapa"
                        src="https://placehold.co/600x800.png"
                        data-ai-hint="senderista mapa brújula"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="font-serif text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl text-foreground">
            {t('reviews_title')}
          </h2>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('review1_text')}</p>
                <p className="font-semibold mt-4">{t('review1_author')}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('review2_text')}</p>
                <p className="font-semibold mt-4">{t('review2_author')}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('review3_text')}</p>
                <p className="font-semibold mt-4">{t('review3_author')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sponsors Section (Unchanged) */}
      <section id="sponsors" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="font-serif text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12 text-foreground">
            {t('sponsors_title')}
          </h2>
          <div className="relative overflow-hidden w-full max-w-6xl mx-auto">
             <div className="flex animate-scroll-infinite">
                {[...sponsors, ...sponsors].map((sponsor, index) => (
                    <div key={index} className="flex-shrink-0 w-1/4 md:w-1/5 p-2">
                         <div className="flex aspect-video items-center justify-center p-6 bg-white rounded-lg shadow-sm">
                            <Image
                                src={sponsor.src}
                                alt={sponsor.alt}
                                data-ai-hint="logo empresa"
                                width={300}
                                height={150}
                                className="object-contain"
                            />
                        </div>
                    </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Contact Section (Unchanged) */}
      <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="font-serif text-3xl font-bold tracking-tighter md:text-4xl/tight text-foreground">
              {t('contact_title')}
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t('contact_subtitle')}
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <form className="grid gap-4">
              <Input placeholder={t('form_name')} type="text" />
              <Input placeholder={t('form_email')} type="email" />
              <Textarea placeholder={t('form_message')} />
              <Button type="submit">{t('form_submit')}</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
