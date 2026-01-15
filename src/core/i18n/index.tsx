import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./resources";
import { useAppStore } from "../store/features/app/use-app-store";

export * from "./utils";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default
    fallbackLng: "en",
    compatibilityJSON: "v4",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// ✅ لا تغيّر RTL هنا، خليه يُدار فقط من applyLanguage
export default i18n;

export const isRTL = () => {
  const language = useAppStore.getState().language;

  // لغات الـ RTL اللي تحتاجها الآن
  const rtlLanguages = ["ar", "he", "fa", "ur"];

  return rtlLanguages.includes(language);
};
