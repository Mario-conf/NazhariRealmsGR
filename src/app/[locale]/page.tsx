'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { StarIcon, ShieldCheck, Mountain, Users, MapPin, Mail, Phone } from 'lucide-react';
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
      title: t('features.feature1_title'),
      description: t('features.feature1_description')
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: t('features.feature2_title'),
      description: t('features.feature2_description')
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: t('features.feature3_title'),
      description: t('features.feature3_description')
    }
  ];

  const reviews = [
      {
          text: t('review1_text'),
          author: t('review1_author'),
          avatar: 'https://placehold.co/100x100.png',
          avatarHint: 'hombre sonriendo'
      },
      {
          text: t('review2_text'),
          author: t('review2_author'),
          avatar: 'https://placehold.co/100x100.png',
          avatarHint: 'mujer con mochila'
      },
      {
          text: t('review3_text'),
          author: t('review3_author'),
          avatar: 'https://placehold.co/100x100.png',
          avatarHint: 'hombre en una cumbre'
      }
  ]

  return (
    <div className="flex-1 bg-gradient-to-b from-papaya-start via-off-white to-footer-dark">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white overflow-hidden">
         <Image
            alt={t('hero_alt')}
            src="https://placehold.co/1920x1080.png"
            data-ai-hint="paisaje montaña épico amanecer"
            fill
            className="object-cover -z-10 brightness-75"
          />
          <div className="container px-4 md:px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
             <div className="max-w-3xl mx-auto">
                <h1 className="font-serif text-4xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl drop-shadow-lg">
                    {t('title')}
                </h1>
                <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
                   {t('subtitle')}
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
                                <h3 className="text-xl font-bold font-serif text-foreground">{feature.title}</h3>
                                <p className="text-muted-foreground mt-1">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="relative aspect-square md:aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
                     <Image
                        alt={t('features.image_alt')}
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
            {reviews.map((review, index) => (
              <Card key={index} className="bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Image src={review.avatar} alt={review.avatarHint} width={56} height={56} className="rounded-full" data-ai-hint={review.avatarHint} />
                    <div>
                        <p className="font-semibold text-foreground">{review.author}</p>
                         <div className="flex items-center gap-0.5">
                            <StarIcon className="w-5 h-5 fill-primary text-primary" />
                            <StarIcon className="w-5 h-5 fill-primary text-primary" />
                            <StarIcon className="w-5 h-5 fill-primary text-primary" />
                            <StarIcon className="w-5 h-5 fill-primary text-primary" />
                            <StarIcon className="w-5 h-5 fill-primary text-primary" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{review.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
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

      {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 text-white">
          <div className="container px-4 md:px-6">
              <div className="text-center mb-12">
                  <h2 className="font-serif text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t('contact.title')}</h2>
                  <p className="mt-4 max-w-3xl mx-auto text-gray-300 md:text-xl">{t('contact.subtitle')}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="h-96 md:h-full w-full rounded-lg overflow-hidden">
                     <Image
                          src="https://placehold.co/800x600.png"
                          data-ai-hint="mapa ubicación granada"
                          alt={t('contact.map_alt')}
                          width={800}
                          height={600}
                          className="w-full h-full object-cover"
                      />
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg shadow-2xl">
                      <h3 className="font-serif text-2xl font-bold mb-6">{t('contact.form_title')}</h3>
                      <form className="space-y-4">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <Input placeholder={t('form_name')} type="text" className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-400" />
                            <Input placeholder={t('form_email')} type="email" className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-400" />
                          </div>
                          <Textarea placeholder={t('form_message')} rows={5} className="bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-400" />
                          <Button type="submit" className="w-full" size="lg">{t('form_submit')}</Button>
                      </form>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
}
