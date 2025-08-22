import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MountainIcon, StarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/navigation';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className="flex-1">
      <section className="w-full py-12 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 relative">
              <Image
                alt={t('hero_alt')}
                className="aspect-[4/3] w-full overflow-hidden rounded-xl object-cover"
                data-ai-hint="senderismo montaña atardecer"
                height="600"
                src="https://placehold.co/800x600.png"
                width="800"
              />
            </div>

            <div className="flex flex-col justify-center space-y-4 rounded-lg bg-card p-8 shadow-lg">
              <div className="space-y-3">
                <h1 className="font-serif text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
                  {t('title')}
                </h1>
                <p className="text-muted-foreground md:text-lg">
                  {t('subtitle')}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/routes">{t('explore_routes')}</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/#contact">{t('join_now')}</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <Image
                alt="Senderista en un puente"
                className="aspect-video w-full overflow-hidden rounded-xl object-cover"
                data-ai-hint="senderista puente colgante"
                height="337"
                src="https://placehold.co/600x337.png"
                width="600"
              />
            </div>

            <div className="relative lg:col-span-2">
              <Image
                alt="Vista panorámica de la montaña"
                className="aspect-[2/1] w-full overflow-hidden rounded-xl object-cover"
                data-ai-hint="vista panorámica montaña"
                height="400"
                src="https://placehold.co/800x400.png"
                width="800"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <h2 className="font-serif text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
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

      <section id="sponsors" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="font-serif text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
            {t('sponsors_title')}
          </h2>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex justify-center">
              <MountainIcon className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="flex justify-center">
              <MountainIcon className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="flex justify-center">
              <MountainIcon className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="font-serif text-3xl font-bold tracking-tighter md:text-4xl/tight">
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