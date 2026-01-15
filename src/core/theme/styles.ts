import { ViewStyle, TextStyle } from "react-native";
import { spacing } from "./spacing";
import { hp, wp } from "../utils";
import { colors } from "./colors";

/* Use this file to define styles that are used in multiple places in your app. */
export const $styles = {
  defaultShadow: {
    shadowColor: colors.neutrals.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
};
