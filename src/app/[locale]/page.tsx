
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { StarIcon, ShieldCheck, Mountain, Users, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { siteConfig } from '@/lib/site-config';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"


export default function Home() {
  const t = useTranslations('HomePage');

  const features = [
    {
      icon: <Mountain className="w-8 h-8 text-black" />,
      title: t('features.feature1_title'),
      description: t('features.feature1_description')
    },
    {
      icon: <Users className="w-8 h-8 text-black" />,
      title: t('features.feature2_title'),
      description: t('features.feature2_description')
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-black" />,
      title: t('features.feature3_title'),
      description: t('features.feature3_description')
    }
  ];
  
  const galleryImages = [
    { src: 'https://elviajerofeliz.com/wp-content/uploads/2020/12/sierra-nevada-y-sus-encantos-0.jpg', hint: 'senderista cumbre' },
    { src: 'https://cdn.e-konomista.pt/uploads/2023/03/nervion1.jpg', hint: 'lago montaña' },
    { src: 'https://i.pinimg.com/originals/b9/b1/96/b9b196ec42dc8cc8cf5fe2a9c70ae7f1.jpg', hint: 'bosque niebla' },
    { src: 'https://s1.it.atcdn.net/wp-content/uploads/2014/09/shutterstock_1405952592.jpg', hint: 'mapa brújula' },
    { src: 'https://www.escapadarural.com/blog/wp-content/uploads/2020/05/gaztelugatxe-landscape-basque-country-spain-stockpack-adobe-stock-scaled.jpg', hint: 'grupo amigos sendero' },
  ];


  return (
    <div className="flex-1" style={{background: 'linear-gradient(to bottom, #f25c3a, #ffffff, #374151)'}}>
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] w-full flex items-center justify-center text-center text-white overflow-hidden bg-transparent">
         <Image
            alt={t('hero_alt')}
            src="https://granadanatural.com/imagenes/paisajes_fichas/sierra-lujar-desde-la-contraviesa-wl1dsc_1047.jpg"
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
                    <Button asChild size="lg" variant="secondary">
                        <Link href="/routes">{t('explore_routes')}</Link>
                    </Button>
                </div>
            </div>
          </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-transparent">
        <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="grid gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <div className="flex-shrink-0">{feature.icon}</div>
                            <div>
                                <h3 className="text-xl font-bold font-serif" style={{ color: 'black' }}>{feature.title}</h3>
                                <p className="mt-1" style={{ color: '#121212' }}>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                     <Image
                        alt={t('features.image_alt')}
                        src="/beg.png"
                        data-ai-hint="senderista mapa brújula"
                        width={600}
                        height={750}
                        className="w-full h-auto"
                    />
                </div>
            </div>
        </div>
      </section>

        {/* Gallery Section */}
        <section id="gallery" className="w-full py-12 md:py-24 lg:py-32 bg-transparent">
            <div className="container px-4 md:px-6">
                <h2 className="font-serif text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12 text-foreground">
                    {t('gallery_title')}
                </h2>
                <Carousel
                    className="w-full max-w-5xl mx-auto"
                    plugins={[
                        Autoplay({
                          delay: 4000,
                          stopOnInteraction: true,
                        }),
                    ]}
                     opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselContent>
                         {galleryImages.map((image, index) => (
                             <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg group">
                                        <Image
                                            src={image.src}
                                            alt={image.hint}
                                            data-ai-hint={image.hint}
                                            fill
                                            className="object-cover transform transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>

      {/* Sponsors Section */}
        <section id="sponsors" className="w-full py-12 md:py-24 lg:py-32 bg-transparent">
            <div className="container px-4 md:px-6">
                <h2 className="font-serif text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12 text-gray-800">
                    {t('sponsors_title')}
                </h2>
                <div className="rounded-2xl bg-white/40 backdrop-blur-sm p-2">
                    <Image
                        src="/1000121392-removebg-preview%20(1).png"
                        alt="Logos de los patrocinadores"
                        width={1200}
                        height={200}
                        className="w-full h-auto object-contain"
                        data-ai-hint="logos patrocinadores"
                    />
                </div>
            </div>
        </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-transparent">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" style={{ color: 'white' }}>{t('contact.title')}</h2>
            <p className="mt-4 max-w-3xl mx-auto md:text-xl font-bold" style={{ color: 'white' }}>{t('contact.subtitle')}</p>
          </div>

          <div className="max-w-4xl mx-auto rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-sm">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Mapa */}
                <div className="overflow-hidden rounded-2xl h-full w-full min-h-[400px]">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d50852.12391120581!2d-3.618215520230638!3d37.19410706548771!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2c9870333c2e0649%3A0x27d300a9607188aa!2sNazhari%20Realms%20GR!5e0!3m2!1ses!2ses!4v1755942346702!5m2!1ses!2ses"width="100%"height="100%"loading="lazy"></iframe>
                </div>


                {/* Formulario */}
                <div className="flex flex-col justify-center h-full">
                  <h3 className="mb-4 text-2xl font-semibold text-center text-white">
                    {t('contact.form_title')}
                  </h3>

                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        type="text"
                        name="fullname"
                        placeholder={t('form_name')}
                        required
                        className="rounded-xl border-white/30 bg-black/20 p-3 text-sm text-white shadow-sm focus:border-primary focus:ring-primary placeholder:text-white/80"
                      />
                      <Input
                        type="email"
                        name="email"
                        placeholder={t('form_email')}
                        required
                        className="rounded-xl border-white/30 bg-black/20 p-3 text-sm text-white shadow-sm focus:border-primary focus:ring-primary placeholder:text-white/80"
                      />
                    </div>

                    <Textarea
                      name="message"
                      placeholder={t('form_message')}
                      required
                      className="h-28 w-full resize-none rounded-xl border-white/30 bg-black/20 p-3 text-sm text-white shadow-sm focus:border-primary focus:ring-primary placeholder:text-white/80"
                    ></Textarea>

                    <Button asChild size="lg" className="w-full gap-2 rounded-xl">
                      <a href="mailto:nazharirealmsgr@gmail.com">
                        <Send className="h-4 w-4" />
                        {t('form_submit')}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>
    </div>
  );
}
    
    

    




    

    

    

    

    

    



    






