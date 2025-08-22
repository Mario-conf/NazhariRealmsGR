import { getReview } from '@/lib/review-data';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Star, ThumbsUp, ThumbsDown, CheckCircle, XCircle } from 'lucide-react';
import { notFound } from 'next/navigation';
import { translateText } from '@/ai/flows/translate-flow';
import { getTranslations } from 'next-intl/server';

export async function generateStaticParams() {
  const { getReviews } = await import('@/lib/review-data');
  const reviews = await getReviews();

  return reviews.map((review) => ({
    slug: review.slug,
  }));
}

export default async function ReviewPostPage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const review = await getReview(params.slug);
  if (!review) {
    notFound();
  }
  
  const t = await getTranslations({locale: params.locale, namespace: 'ReviewDetailsPage'});

  const { translatedText } = await translateText({
    text: review.content,
    targetLanguage: params.locale,
  });

  return (
    <article className="container mx-auto max-w-4xl py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Columna Izquierda - Ficha de Producto */}
        <aside className="md:col-span-1 space-y-6 md:sticky md:top-24 h-fit">
           <Card className="overflow-hidden">
                <div className="relative h-48 w-full">
                <Image
                    src={review.image}
                    alt={review.productName}
                    data-ai-hint={review.imageHint}
                    fill
                    className="object-cover"
                    priority
                />
                </div>
                <CardHeader>
                    <CardTitle className="font-serif text-2xl">{review.productName}</CardTitle>
                    <CardDescription className="text-base">{review.brand}</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="flex items-center gap-2 text-amber-500 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star
                            key={i}
                            className={`h-6 w-6 ${
                                i < Math.round(review.rating) ? 'fill-current' : 'text-muted-foreground/30'
                            }`}
                            />
                        ))}
                        <span className="text-xl font-bold text-foreground ml-2">{review.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {review.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                        </Badge>
                        ))}
                    </div>
                </CardContent>
           </Card>
           <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">{t('summary_title')}</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-muted-foreground">{review.summary}</p>
                </CardContent>
           </Card>
        </aside>

        {/* Columna Derecha - Contenido de la Reseña */}
        <main className="md:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" /> {review.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {new Date(review.date).toLocaleDateString(params.locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                 <Badge variant="default">{review.category}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-serif text-xl font-semibold flex items-center gap-2 mb-3">
                            <ThumbsUp className="h-5 w-5 text-green-500" />
                            {t('pros_title')}
                        </h3>
                        <ul className="space-y-2">
                            {review.pros.map((pro, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground">{pro}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-serif text-xl font-semibold flex items-center gap-2 mb-3">
                            <ThumbsDown className="h-5 w-5 text-destructive" />
                            {t('cons_title')}
                        </h3>
                         <ul className="space-y-2">
                            {review.cons.map((con, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground">{con}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                 </div>


              <div
                className="prose prose-lg max-w-none prose-p:text-muted-foreground prose-headings:font-serif prose-headings:text-foreground prose-strong:text-foreground"
                dangerouslySetInnerHTML={{ __html: translatedText }}
              />
            </CardContent>
          </Card>
        </main>
      </div>
    </article>
  );
}
