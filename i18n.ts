import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  try {
    return {
      messages: (await import(`./messages/${locale}.json`)).default
    };
  } catch (error) {
    console.error('Error loading messages:', error);
    return {
      messages: {} // Provide a fallback empty object
    };
  }
});