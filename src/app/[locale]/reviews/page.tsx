
import { getReviews } from '@/lib/review-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Calendar, Star } from 'lucide-react';

export default async function ReviewsPage() {
  const t = useTranslations('ReviewsPage');
  const reviews = await getReviews();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="font-serif text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
          {t('title')}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
          {t('subtitle')}
        </p>
      </header>

      {reviews.length === 0 ? (
         <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed rounded-lg">
            <p className="text-xl font-semibold text-muted-foreground">
                {t('no_reviews_title')}
            </p>
            <p className="text-muted-foreground">
                {t('no_reviews_subtitle')}
            </p>
        </div>
      ) : (
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card key={review.id} className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
              <CardHeader className="p-0">
                 <Link href={`/reviews/${review.slug}`} className="block">
                    <div className="relative h-48 w-full">
                        <Image
                            src={review.image}
                            alt={review.productName}
                            data-ai-hint={review.imageHint}
                            fill
                            className="object-cover"
                        />
                    </div>
                </Link>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                        <Badge variant="secondary">{review.category}</Badge>
                         <div className="flex items-center gap-1 text-amber-500">
                            <Star className="h-5 w-5 fill-current" />
                            <span className="font-bold text-base">{review.rating.toFixed(1)}</span>
                        </div>
                    </div>
                    <CardTitle className="font-serif text-xl mb-1">
                        <Link href={`/reviews/${review.slug}`}>{review.productName}</Link>
                    </CardTitle>
                    <CardDescription>{review.brand}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-6 pt-0">
                <p className="line-clamp-3 text-muted-foreground">{review.summary}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full">
                  <Link href={`/reviews/${review.slug}`}>{t('read_more')}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </main>
      )}
    </div>
  );
}
