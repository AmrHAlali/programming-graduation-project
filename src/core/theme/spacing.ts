import { hp, wp } from "../utils";

export const spacing = {
  xxxs: wp(0.5),
  xxs: wp(1),
  xs: wp(2),
  sm: hp(1.5),
  md: hp(2),
  lg: hp(3),
  xl: wp(4),
  xxl: wp(6),
  xxxl: hp(8),
} as const;
