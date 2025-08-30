
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Shield, Mountain, Heart } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import type { Metadata } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';


type RuleContent = {
  title: string;
  subtitle: string;
  safety_title: string;
  safety1_title: string;
  safety1_content: string;
  safety2_title: string;
  safety2_content: string;
  safety3_title: string;
  safety3_content: string;
  lnt_title: string;
  lnt1_trigger: string;
  lnt1_content: string;
  lnt2_trigger: string;
  lnt2_content: string;
  lnt3_trigger: string;
  lnt3_content: string;
  lnt4_trigger: string;
  lnt4_content: string;
  etiquette_title: string;
  etiquette1_title: string;
  etiquette1_content: string;
  etiquette2_title: string;
  etiquette2_content: string;
  etiquette3_title: string;
  etiquette3_content: string;
  internet_title: string;
  internet_content: string;
}

async function getRulesContent(locale: string): Promise<RuleContent> {
  const dataDirectory = path.join(process.cwd(), 'public', 'data', 'rules');
  let filePath = path.join(dataDirectory, `rules.${locale}.json`);
  
  try {
    await fs.access(filePath);
  } catch (error) {
    console.warn(`Rules data for locale "${locale}" not found, falling back to "es".`);
    filePath = path.join(dataDirectory, `rules.es.json`);
  }

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Failed to read or parse rules data from ${filePath}:`, error);
    notFound();
  }
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'RulesPage' });
 
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}


export default async function RulesPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getRulesContent(locale);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-serif text-4xl font-bold tracking-tighter sm:text-5xl">
          {t.title}
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          {t.subtitle}
        </p>
      </div>

      <div className="mt-12 max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 font-serif">
              <Shield className="h-6 w-6 text-primary" />
              {t.safety_title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p><strong>{t.safety1_title}:</strong> {t.safety1_content}</p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
               <p><strong>{t.safety2_title}:</strong> {t.safety2_content}</p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p><strong>{t.safety3_title}:</strong> {t.safety3_content}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 font-serif">
              <Mountain className="h-6 w-6 text-primary" />
              {t.lnt_title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>{t.lnt1_trigger}</AccordionTrigger>
                <AccordionContent>{t.lnt1_content}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>{t.lnt2_trigger}</AccordionTrigger>
                <AccordionContent>{t.lnt2_content}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>{t.lnt3_trigger}</AccordionTrigger>
                <AccordionContent>{t.lnt3_content}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>{t.lnt4_trigger}</AccordionTrigger>
                <AccordionContent>{t.lnt4_content}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 font-serif">
              <Heart className="h-6 w-6 text-primary" />
              {t.etiquette_title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
             <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p><strong>{t.etiquette1_title}:</strong> {t.etiquette1_content}</p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
              <p><strong>{t.etiquette2_title}:</strong> {t.etiquette2_content}</p>
            </div>
             <div className="flex items-start gap-4">
              <CheckCircle2 className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" />
               <p><strong>{t.etiquette3_title}:</strong> {t.etiquette3_content}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
