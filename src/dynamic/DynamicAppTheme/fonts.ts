// theme/fontMap.ts
import type { TextStyle } from "react-native"

import {
  useFonts as useInterFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter"
import {
  useFonts as useRobotoFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto"
import {
  useFonts as useOpenSansFonts,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from "@expo-google-fonts/open-sans"
import {
  useFonts as useMontserratFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat"
import {
  useFonts as usePoppinsFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins"
import {
  useFonts as useLatoFonts,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato"
import {
  useFonts as useNunitoFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito"
import {
  useFonts as useRalewayFonts,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway"
import {
  useFonts as usePlayfairFonts,
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold,
} from "@expo-google-fonts/playfair-display"
import {
  useFonts as useMerriweatherFonts,
  Merriweather_400Regular,
  Merriweather_700Bold,
} from "@expo-google-fonts/merriweather"

export interface FontVariant {
  fontFamily: string
  fontWeight: TextStyle["fontWeight"]
}

/**
 * Map of logical families → available weights → registered RN font names
 * (keys must be lowercase)
 */
const FONTS: Record<
  string,
  Record<number, FontVariant>
> = {
  inter: {
    400: { fontFamily: "Inter_400Regular", fontWeight: "400" },
    500: { fontFamily: "Inter_500Medium", fontWeight: "500" },
    700: { fontFamily: "Inter_700Bold", fontWeight: "700" },
  },
  roboto: {
    400: { fontFamily: "Roboto_400Regular", fontWeight: "400" },
    500: { fontFamily: "Roboto_500Medium", fontWeight: "500" },
    700: { fontFamily: "Roboto_700Bold", fontWeight: "700" },
  },
  "open-sans": {
    400: { fontFamily: "OpenSans_400Regular", fontWeight: "400" },
    600: { fontFamily: "OpenSans_600SemiBold", fontWeight: "600" },
    700: { fontFamily: "OpenSans_700Bold", fontWeight: "700" },
  },
  montserrat: {
    400: { fontFamily: "Montserrat_400Regular", fontWeight: "400" },
    500: { fontFamily: "Montserrat_500Medium", fontWeight: "500" },
    700: { fontFamily: "Montserrat_700Bold", fontWeight: "700" },
  },
  poppins: {
    400: { fontFamily: "Poppins_400Regular", fontWeight: "400" },
    500: { fontFamily: "Poppins_500Medium", fontWeight: "500" },
    700: { fontFamily: "Poppins_700Bold", fontWeight: "700" },
  },
  lato: {
    400: { fontFamily: "Lato_400Regular", fontWeight: "400" },
    700: { fontFamily: "Lato_700Bold", fontWeight: "700" },
  },
  nunito: {
    400: { fontFamily: "Nunito_400Regular", fontWeight: "400" },
    600: { fontFamily: "Nunito_600SemiBold", fontWeight: "600" },
    700: { fontFamily: "Nunito_700Bold", fontWeight: "700" },
  },
  raleway: {
    400: { fontFamily: "Raleway_400Regular", fontWeight: "400" },
    500: { fontFamily: "Raleway_500Medium", fontWeight: "500" },
    700: { fontFamily: "Raleway_700Bold", fontWeight: "700" },
  },
  "playfair-display": {
    400: { fontFamily: "PlayfairDisplay_400Regular", fontWeight: "400" },
    700: { fontFamily: "PlayfairDisplay_700Bold", fontWeight: "700" },
  },
  merriweather: {
    400: { fontFamily: "Merriweather_400Regular", fontWeight: "400" },
    700: { fontFamily: "Merriweather_700Bold", fontWeight: "700" },
  },
}

const DEFAULT_FONT: FontVariant = { fontFamily: "System", fontWeight: "400" }

/** Normalize any RN-supported weight to a numeric 100..900 */
function normalizeWeight(weight?: TextStyle["fontWeight"]): number {
  if (weight == null) return 400
  if (typeof weight === "number") return clampWeight(weight)

  const w = String(weight).toLowerCase()

  // Direct numeric strings "100".."900"
  const parsed = parseInt(w, 10)
  if (!Number.isNaN(parsed)) return clampWeight(parsed)

  // Common aliases
  const map: Record<string, number> = {
    normal: 400,
    regular: 400,
    bold: 700,
    thin: 100,
    ultralight: 100,
    "ultra-light": 100,
    light: 300,
    medium: 500,
    "semi-bold": 600,
    semibold: 600,
    heavy: 800,
    black: 900,
    condensed: 400,
    condensedbold: 700,
  }
  return map[w] ?? 400
}

function clampWeight(n: number): number {
  if (n < 100) return 100
  if (n > 900) return 900
  // Round to nearest hundred
  const rounded = Math.round(n / 100) * 100
  return Math.min(900, Math.max(100, rounded))
}

/** Pick the nearest available weight from a family's variants */
function nearestAvailableWeight(
  requested: number,
  available: Record<number, FontVariant>,
): number {
  const weights = Object.keys(available).map(Number)
  let best = weights[0]
  let bestDiff = Math.abs(requested - best)
  for (const w of weights) {
    const diff = Math.abs(requested - w)
    if (diff < bestDiff) {
      best = w
      bestDiff = diff
    }
  }
  return best
}

/**
 * Public API:
 * Returns a safe { fontFamily, fontWeight } for the desired family & weight.
 * - fontFamily: logical family name (e.g., "poppins", "open-sans")
 * - fontWeight: any RN-supported weight (number or alias)
 */
export function getFont(
  fontFamily?: string,
  fontWeight?: TextStyle["fontWeight"],
): FontVariant {
  const familyKey = fontFamily?.toLowerCase()
  if (!familyKey || !FONTS[familyKey]) return DEFAULT_FONT

  const normalized = normalizeWeight(fontWeight)
  const available = FONTS[familyKey]
  const chosen = available[normalized]
    ? normalized
    : nearestAvailableWeight(normalized, available)

  return available[chosen] ?? DEFAULT_FONT
}

/**
 * Load all registered families/weights used above.
 * Call this once at startup (e.g., in App.tsx) and gate rendering on its return.
 */
export function useAppFonts() {
  const [loadedInter] = useInterFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  })
  const [loadedRoboto] = useRobotoFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  })
  const [loadedOpenSans] = useOpenSansFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  })
  const [loadedMontserrat] = useMontserratFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
  })
  const [loadedPoppins] = usePoppinsFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })
  const [loadedLato] = useLatoFonts({
    Lato_400Regular,
    Lato_700Bold,
  })
  const [loadedNunito] = useNunitoFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  })
  const [loadedRaleway] = useRalewayFonts({
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_700Bold,
  })
  const [loadedPlayfair] = usePlayfairFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
  })
  const [loadedMerriweather] = useMerriweatherFonts({
    Merriweather_400Regular,
    Merriweather_700Bold,
  })

  return (
    loadedInter &&
    loadedRoboto &&
    loadedOpenSans &&
    loadedMontserrat &&
    loadedPoppins &&
    loadedLato &&
    loadedNunito &&
    loadedRaleway &&
    loadedPlayfair &&
    loadedMerriweather
  )
}

// (Optional) export list for validation/autocomplete elsewhere
export const AVAILABLE_FONT_FAMILIES = Object.keys(FONTS)
