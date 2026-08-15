export type Lang = 'en';

export const content = {
  en: {
    bookThanks: {
      eyebrow: 'Appointment confirmed.',
      headline: 'See you soon.',
      body: 'Check your email for the confirmation. In the meantime, browse our applications and pricing.',
      cta: 'View applications',
    },
  },
} as const;

export type ContentTree = typeof content;
export type ContentEn = ContentTree['en'];
export type LangContent = ContentEn;
