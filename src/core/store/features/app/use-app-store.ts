import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Language } from "@/core/i18n/resources";
import { I18nManager, NativeModules, Platform } from "react-native";
import RNRestart from "react-native-restart";
import i18n from "@/core/i18n";

/* --------------------------------------------------
   Helpers
-------------------------------------------------- */

const applyLanguage = async (lang: Language) => {
  const isArabic = lang === "ar";
  const currentRTL = I18nManager.isRTL;

  await i18n.changeLanguage(lang);

  if (currentRTL !== isArabic) {
    I18nManager.allowRTL(isArabic);
    I18nManager.forceRTL(isArabic);

    if (Platform.OS === "ios" || Platform.OS === "android") {
      if (__DEV__ && NativeModules.DevSettings?.reload) {
        NativeModules.DevSettings.reload();
      } else {
        RNRestart.restart();
      }
    } else if (Platform.OS === "web") {
      window.location.reload();
    }
  }
};

/* --------------------------------------------------
   Store Definition (MAP REMOVED)
-------------------------------------------------- */

interface AppState {
  language: Language;
  currency: string;
  initialized: boolean;

  /* actions */
  initAppLanguage: () => Promise<void>;
  setAppLanguage: (lang: Language, skipRestart?: boolean) => Promise<void>;
  setAppCurrency: (currency: string) => void;
}

/* --------------------------------------------------
   STORE
-------------------------------------------------- */

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      /* default values */
      language: "en",
      currency: "usd",
      initialized: false,

      /* Actions */

      initAppLanguage: async () => {
        const lang = get().language;
        await applyLanguage(lang);
        set({ initialized: true });
      },

      setAppLanguage: async (lang) => {
        if (get().language === lang) return;
        set({ language: lang });
        await applyLanguage(lang);
      },

      setAppCurrency: (currency) => set({ currency }),
    }),

    {
      name: "app-storage",
      storage: createJSONStorage(() => AsyncStorage),

      /* Persist entire state (no UI-only fields remain) */
      partialize: (state) => state,

      /* Re-apply language on app launch */
      onRehydrateStorage: () => async (persistedState) => {
        if (persistedState?.language) {
          await applyLanguage(persistedState.language);
        }
      },
    }
  )
);
