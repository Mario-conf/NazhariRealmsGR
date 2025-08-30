
import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
 
// Can be imported from a shared config
const locales = ['en', 'es', 'de', 'it', 'fr'];
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
 
  let messages;
  switch (locale) {
    case 'en':
      messages = (await import('../messages/en.json')).default;
      break;
    case 'es':
      messages = (await import('../messages/es.json')).default;
      break;
    case 'de':
      messages = (await import('../messages/de.json')).default;
      break;
    case 'it':
      messages = (await import('../messages/it.json')).default;
      break;
    case 'fr':
      messages = (await import('../messages/fr.json')).default;
      break;
    default:
      notFound();
  }

  return {
    locale,
    messages
  };
});
