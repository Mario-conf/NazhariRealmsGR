import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Shield, Mountain, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function RulesPage() {
  const t = useTranslations('RulesPage');

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          {t('subtitle')}
        </p>
      </div>

      <div className="mt-12 max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              {t('safety_title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p dangerouslySetInnerHTML={{ __html: t.raw('safety1') }} />
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p dangerouslySetInnerHTML={{ __html: t.raw('safety2') }} />
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p dangerouslySetInnerHTML={{ __html: t.raw('safety3') }} />
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p dangerouslySetInnerHTML={{ __html: t.raw('safety4') }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Mountain className="h-6 w-6 text-primary" />
              {t('lnt_title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>{t('lnt1_trigger')}</AccordionTrigger>
                <AccordionContent>
                  {t('lnt1_content')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  {t('lnt2_trigger')}
                </AccordionTrigger>
                <AccordionContent>
                  {t('lnt2_content')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>{t('lnt3_trigger')}</AccordionTrigger>
                <AccordionContent>
                  {t('lnt3_content')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>{t('lnt4_trigger')}</AccordionTrigger>
                <AccordionContent>
                  {t('lnt4_content')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>{t('lnt5_trigger')}</AccordionTrigger>
                <AccordionContent>
                  {t('lnt5_content')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>{t('lnt6_trigger')}</AccordionTrigger>
                <AccordionContent>
                  {t('lnt6_content')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger>
                  {t('lnt7_trigger')}
                </AccordionTrigger>
                <AccordionContent>
                  {t('lnt7_content')}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-primary" />
              {t('etiquette_title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
             <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p dangerouslySetInnerHTML={{ __html: t.raw('etiquette1') }} />
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p dangerouslySetInnerHTML={{ __html: t.raw('etiquette2') }} />
            </div>
             <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p dangerouslySetInnerHTML={{ __html: t.raw('etiquette3') }} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
