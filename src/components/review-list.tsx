import type { Review } from '@/lib/trail-data';
import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { useLocale, useTranslations } from 'next-intl';

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  const t = useTranslations('ReviewList');
  const locale = useLocale();

  if (reviews.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p>{t('no_reviews_1')}</p>
        <p>{t('no_reviews_2')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
      {reviews.map((review) => (
        <Card key={review.id} className="bg-muted/50">
          <CardHeader className="p-4">
             <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">{review.author}</CardTitle>
                <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <Star
                    key={i}
                    className={`h-4 w-4 ${
                        i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/50'
                    }`}
                    />
                ))}
                </div>
            </div>
            <CardDescription className="text-xs pt-1">
              {new Date(review.date).toLocaleDateString(locale)}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm text-muted-foreground">{review.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
