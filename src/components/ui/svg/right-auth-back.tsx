import { colors, hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const RightAuthBackSVG: React.FC<Props> = ({
  width = wp(6),
  height = hp(8),
  color = colors.primary,
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 22 22"
    fill="none"
    {...props}
  >
    <Path
      d="M10.9999 0.333008L9.11992 2.21301L16.5599 9.66634H0.333252V12.333H16.5599L9.11992 19.7863L10.9999 21.6663L21.6666 10.9997L10.9999 0.333008Z"
      fill={color}
    />
  </Svg>
);
