const LANGUAGE_MAP: Record<string, string> = {
  en: 'English',
  ar: 'Arabic',
};

export const AVAILABLE_LANGUAGES = Object.keys(LANGUAGE_MAP).map(code => ({
  label: LANGUAGE_MAP[code],
  value: code
}));

export const getLanguageNameFromCode = (code: string): string => {
  const lower = code.toLowerCase();
  return LANGUAGE_MAP[lower] || code;
};
