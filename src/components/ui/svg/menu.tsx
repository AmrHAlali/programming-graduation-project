import { colors, hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const MenuSVG: React.FC<Props> = ({
  width = wp(9),
  height = hp(9),
  color = colors.neutrals.gray700,
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 15"
    fill="none"
    {...props}
  >
    <Path
      d="M1.33333 1.33333H22.6667M4 7.33333H20M8 13.3333H16"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);
