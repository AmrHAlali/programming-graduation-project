import {
  Roboto_500Medium as robotoSemiBold,
  Roboto_700Bold as robotoBold,
} from "@expo-google-fonts/roboto";

import {
  Nunito_300Light as poppinsLight,
  Nunito_400Regular as poppinsRegular,
  Nunito_500Medium as poppinsMedium,
  Nunito_600SemiBold as poppinsSemiBold,
  Nunito_700Bold as poppinsBold,
} from "@expo-google-fonts/nunito";

import { fontRegistry } from "../utils";
import { useAppStore } from "@/core/store/features/app/use-app-store";


export const customFontsToLoad = {
  tajawalBold: fontRegistry.TajawalBold,
  tajawalLight: fontRegistry.TajawalLight,
  tajawalMedium: fontRegistry.TajawalMedium,

  robotoSemiBold,
  robotoBold,

  // Names unchanged — now mapped to Nunito
  poppinsLight,
  poppinsRegular,
  poppinsMedium,
  poppinsSemiBold,
  poppinsBold,
};


const fontFamilies = {
  tajawal: {
    bold: "tajawalBold",
    medium: "tajawalMedium",
    light: "tajawalLight",
  },

  roboto: {
    semiBold: "robotoSemiBold",
    bold: "robotoBold",
  },

  poppins: {
    light: "poppinsLight",
    regular: "poppinsRegular",
    medium: "poppinsMedium",
    semiBold: "poppinsSemiBold",
    bold: "poppinsBold",
  },
};


export const getTypography = () => {
  const language = useAppStore.getState().language;

  return {
    fonts: fontFamilies,

    primary:
      language === "en"
        ? fontFamilies.poppins
        : fontFamilies.tajawal,

    secondary: fontFamilies.roboto,

    poppins: fontFamilies.poppins,
  };
};
