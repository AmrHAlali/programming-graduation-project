import { useTranslated } from "./use-translated";

export function useCurrencyByLanguage(long?: boolean) {
  return useTranslated(
    "currency",
    "settings.currencies",
    "settings.short-currencies",
    long
  );
}
