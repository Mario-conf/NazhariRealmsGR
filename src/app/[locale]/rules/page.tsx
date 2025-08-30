
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Shield, Mountain, Heart, Scale } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { translateRules } from '@/ai/flows/translate-flow';
import type { RuleContent } from '@/ai/schemas/translate-schema';
import { RuleContentSchema } from '@/ai/schemas/translate-schema';


async function getRulesContent(locale: string): Promise<RuleContent> {
  const baseLang = 'es';
  const fallbackFilePath = path.join(process.cwd(), 'public', 'data', 'rules', `rules.${baseLang}.json`);
  let filePath = path.join(process.cwd(), 'public', 'data', 'rules', `rules.${locale}.json`);

  try {
    // Try to access the locale-specific file first
    await fs.access(filePath);
  } catch (error) {
    // If it doesn't exist, use the Spanish one and translate it
    console.warn(`Rules file for locale "${locale}" not found. Falling back to translating from "${baseLang}".`);
    
    try {
        const fileContents = await fs.readFile(fallbackFilePath, 'utf8');
        const baseContent = JSON.parse(fileContents);

        const parsedBaseContent = RuleContentSchema.safeParse(baseContent);
        if (!parsedBaseContent.success) {
            console.error(`Failed to validate base rules content (rules.${baseLang}.json):`, parsedBaseContent.error);
            throw new Error("Base rules file is invalid.");
        }
        
        // Translate using the AI flow
        const translatedContent = await translateRules({ 
            jsonContent: parsedBaseContent.data, 
            targetLanguage: locale 
        });
        
        return translatedContent;

    } catch (translationError) {
       console.error(`Failed to read or translate base rules file for locale ${locale}:`, translationError);
       notFound();
    }
  }

  // If the locale-specific file exists, read and return it
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const content = JSON.parse(fileContents);
    const parsedContent = RuleContentSchema.safeParse(content);
     if (!parsedContent.success) {
        console.error(`Failed to validate rules content for locale "${locale}":`, parsedContent.error);
        throw new Error(`Rules file for ${locale} is invalid.`);
    }
    return parsedContent.data;
  } catch (readError) {
     console.error(`Failed to read or parse rules file for locale ${locale}:`, readError);
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
          <CardContent className="space-y-4 text-muted-foreground prose prose-sm max-w-none">
            <h4>{t.safety1_title}</h4>
            <p>{t.safety1_content}</p>
            
            <h4>{t.safety2_title}</h4>
            <p className="whitespace-pre-line">{t.safety2_content}</p>

            <h4>{t.safety3_title}</h4>
            <p className="whitespace-pre-line">{t.safety3_content}</p>
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
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 font-serif">
              <Scale className="h-6 w-6 text-primary" />
              {t.spaces_title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Espacio Natural</TableHead>
                  <TableHead className="font-bold">Fuego</TableHead>
                  <TableHead className="font-bold">Acampada</TableHead>
                  <TableHead className="font-bold">Pernocta</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {t.spaces_list.map((space, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{space.name}</TableCell>
                    <TableCell>{space.fuego}</TableCell>
                    <TableCell>{space.acampada}</TableCell>
                    <TableCell>{space.pernocta}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
