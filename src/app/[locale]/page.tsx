
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

export default function Home() {
  const t = useTranslations('HomePage');

  const sponsors = [
    { id: 1, src: 'https://i0.wp.com/tc-waalwijk.nl/wp-content/uploads/2018/01/Strava-Logo.png?w=600&ssl=1', alt: 'Logo'},
    { id: 2, src: 'https://www.iessansebastian.com/web/wp-content/uploads/2021/07/ced_horizontal-300x75.png', alt: 'Logo' },
    { id: 3, src: 'https://tse3.mm.bing.net/th/id/OIP.gitPYpYsWGJUecokH3jNDQHaCh?rs=1&pid=ImgDetMain&o=7&rm=3', alt: 'Logo' },
    { id: 4, src: 'https://logos-world.net/wp-content/uploads/2020/01/Decathlon-Logo.png', alt: ' Logo' },
    { id: 5, src: 'https://thinkmarketingmagazine.com/wp-content/uploads/2022/08/Amazon_logo.svg.png', alt: ' Logo' },
    { id: 6, src: 'https://seekvectorlogo.com/wp-content/uploads/2022/01/alsa-vector-logo-2022.png', alt: ' Logo' },
    { id: 7, src: 'https://www.twice.com/wp-content/uploads/2021/11/Amazfit-Logo_1-726x182.png', alt: 'Logo' },
    { id: 8, src: 'https://ulefonepty.com/wp-content/uploads/2022/05/Ulefone%E6%96%B0logo-png-04-01.png', alt: 'Logo' },
    { id: 9, src: 'https://www.liblogo.com/img-logo/re1425r8db-renfe-logo-renfe-logo-download-vector.png', alt: 'Logo' }
  ];
  
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

  const reviews = [
    {
      "nombre": "Laura Gómez",
      "estrellas": 5,
      "texto": "Una experiencia increíble, los guías transmiten mucha seguridad y el ambiente del grupo es muy acogedor. Ideal para iniciarse en el senderismo y conocer gente nueva.",
      "avatar": "https://www.svgrepo.com/show/452030/avatar-default.svg",
      "avatarHint": "mujer sonriendo"
    },
    {
      "nombre": "Carlos Martín",
      "estrellas": 3,
      "texto": "Las rutas están bien organizadas, aunque a veces se hacen un poco largas para principiantes. Me hubiera gustado más pausas para descansar.",
      "avatar": "https://www.svgrepo.com/show/452030/avatar-default.svg",
      "avatarHint": "hombre con barba"
    },
    {
      "nombre": "Ana Rodríguez",
      "estrellas": 5,
      "texto": "Excelente club, muy responsables con la seguridad en montaña. Se nota la pasión por la naturaleza. Repetiré sin duda en la próxima salida.",
      "avatar": "https://www.svgrepo.com/show/452030/avatar-default.svg",
      "avatarHint": "mujer con gafas"
    },
    {
      "nombre": "Miguel Torres",
      "estrellas": 2,
      "texto": "El recorrido fue bonito pero había demasiada gente en la excursión y eso dificultó el ritmo. Sería mejor limitar un poco los grupos.",
      "avatar": "https://www.svgrepo.com/show/452030/avatar-default.svg",
      "avatarHint": "hombre joven"
    },
    {
      "nombre": "Sofía Hernández",
      "estrellas": 4,
      "texto": "Gran variedad de rutas, desde fáciles hasta de alta montaña. Los organizadores siempre están atentos a todos los detalles. Muy recomendable para quien busque aprender y disfrutar.",
      "avatar": "https://www.svgrepo.com/show/452030/avatar-default.svg",
      "avatarHint": "mujer pelo rizado"
    },
    {
      "nombre": "David López",
      "estrellas": 4,
      "texto": "Me gustó la caminata, aunque esperaba algo más de información cultural sobre la zona. Aun así, el grupo fue muy agradable y los paisajes espectaculares.",
      "avatar": "https://www.svgrepo.com/show/452030/avatar-default.svg",  
      "avatarHint": "hombre con gorra"
    }
  ];
  
  const galleryImages = [
    { src: 'https://elviajerofeliz.com/wp-content/uploads/2020/12/sierra-nevada-y-sus-encantos-0.jpg', hint: 'senderista cumbre', className: 'md:col-span-2 md:row-span-2' },
    { src: 'https://cdn.e-konomista.pt/uploads/2023/03/nervion1.jpg', hint: 'lago montaña' },
    { src: 'https://i.pinimg.com/originals/b9/b1/96/b9b196ec42dc8cc8cf5fe2a9c70ae7f1.jpg', hint: 'bosque niebla' },
    { src: 'https://s1.it.atcdn.net/wp-content/uploads/2014/09/shutterstock_1405952592.jpg', hint: 'mapa brújula' },
    { src: 'https://www.escapadarural.com/blog/wp-content/uploads/2020/05/gaztelugatxe-landscape-basque-country-spain-stockpack-adobe-stock-scaled.jpg', hint: 'grupo amigos sendero' },
  ];


  return (
    <div className="flex-1" style={{background: 'linear-gradient(to bottom, #f25c3a, #ffffff, #374151)'}}>
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white overflow-hidden bg-transparent">
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
                    <Button asChild size="lg">
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
                <div className="relative aspect-square md:aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
                     <Image
                        alt={t('features.image_alt')}
                        src="https://images.ecestaticos.com/37BtC2qV7E7188eeiimvgqmNdrc=/0x139:2710x1667/1600x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F251%2Fa33%2Ffa4%2F251a33fa465096ed19fe8ba0d7719a77.jpg"
                        data-ai-hint="senderista mapa brújula"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
      </section>

      {/* Reviews Section */}
        <section id="reviews" className="w-full py-12 md:py-24 lg:py-32 overflow-hidden bg-transparent">
            <div className="container px-4 md:px-6 text-center">
                 <h2 className="font-serif text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-12">
                    {t('reviews_title')}
                </h2>
            </div>
             <div className="relative w-full max-w-7xl mx-auto">
                 <div className="flex animate-scroll-infinite">
                    {[...reviews, ...reviews].map((review, index) => (
                         <div key={index} className="flex-shrink-0 w-full max-w-sm p-4">
                            <Card className="h-full bg-background/80 backdrop-blur-sm">
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <Image src={review.avatar} alt={review.avatarHint} width={56} height={56} className="rounded-full" data-ai-hint={review.avatarHint} />
                                    <div>
                                        <p className="font-semibold text-foreground">{review.nombre}</p>
                                        <div className="flex items-center gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                              <StarIcon key={i} className={`h-5 w-5 ${i < review.estrellas ? 'fill-primary text-primary' : 'fill-muted text-muted-foreground'}`} />
                                            ))}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                <p className="text-muted-foreground italic">"{review.texto}"</p>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                 </div>
             </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="w-full py-12 md:py-24 lg:py-32 bg-transparent">
            <div className="container px-4 md:px-6">
                <h2 className="font-serif text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12 text-foreground">
                    {t('gallery_title')}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px]">
                    {galleryImages.map((image, index) => (
                        <div key={index} className={`relative rounded-lg overflow-hidden shadow-lg group ${image.className || ''}`}>
                            <Image
                                src={image.src}
                                alt={image.hint}
                                data-ai-hint={image.hint}
                                fill
                                className="object-cover transform transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="w-full py-12 md:py-24 lg:py-32 bg-transparent">
        <div className="container px-4 md:px-6">
          <h2 className="font-serif text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12 text-white">
            {t('sponsors_title')}
          </h2>
          <div className="relative overflow-hidden w-full max-w-6xl mx-auto">
             <div className="flex animate-scroll-infinite">
                {[...sponsors, ...sponsors].map((sponsor, index) => (
                    <div key={index} className="flex-shrink-0 w-1/4 md:w-1/5 p-2">
                         <div className="flex aspect-video items-center justify-center p-6 bg-white backdrop-blur-sm rounded-lg shadow-sm">
                            <Image
                                src={sponsor.src}
                                alt={sponsor.alt}
                                data-ai-hint="logo empresa"
                                width={160}
                                height={90}
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
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15901.6678030832!2d-3.603804679672174!3d37.17648795197474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd71fca43f5de6db%3A0x2c90f854d215b20!2sGranada%2C%20Spain!5e0!3m2!1sen!2sbd!4v1647608789441!5m2!1sen!2sbd"
                    width="100%"
                    height="100%"
                    loading="lazy"
                    className="w-full h-full rounded-xl filter grayscale invert transition-all duration-300 hover:filter-none"
                  ></iframe>
                </div>

                {/* Formulario */}
                <div className="flex flex-col justify-center h-full">
                  <h3 className="mb-4 text-2xl font-semibold text-center text-white">
                    {t('contact.form_title')}
                  </h3>

                  <form className="space-y-4">
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

                    <Button
                      type="submit"
                      className="w-full gap-2 rounded-xl"
                      size="lg"
                    >
                      <Send className="h-4 w-4" />
                      {t('form_submit')}
                    </Button>
                  </form>
                </div>
              </div>
          </div>
        </div>
      </section>
    </div>
  );
}

    