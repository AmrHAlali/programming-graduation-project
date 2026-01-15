import ar from '@/translations/ar/ar';
import en from '@/translations/en/en';

export const resources = {
  ar: {
    translation: ar,
  },
  en: {
    translation: en,
  },
};

export type Language = keyof typeof resources;
