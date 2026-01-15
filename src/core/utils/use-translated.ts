// hooks/useTranslatedSetting.ts
import { useEffect, useState } from "react";
import i18n from "@/core/i18n";
import { useAppStore } from "../store/features/app/use-app-store";

export function useTranslated(
  storeKey: "currency",
  longPath: string,
  shortPath: string,
  long?: boolean
) {
  const value = useAppStore((state) => state[storeKey]);
  const [translated, setTranslated] = useState("");

  useEffect(() => {
    const t = i18n.t.bind(i18n);

    const path = long
      ? `${longPath}.${value}`
      : `${shortPath}.${value}`;

    setTranslated(t(path));
  }, [value, long, i18n.language]);

  return translated;
}
