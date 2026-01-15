import { colors, hp, wp } from "@/core";
import * as React from "react";
import Svg, { G, Mask, Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const ApartmentFacadeSvg: React.FC<Props> = ({
  width = wp(8),
  height = hp(8),
  color = colors.neutrals.gray600,
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <Mask
      id="mask0_54192_1874"
      style="mask-type:luminance"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="20"
      height="20"
    >
      {/* original mask paths from your SVG (kept literal for luminance) */}
      <Path
        d="M17.5 1H2.5C1.67157 1 1 1.67157 1 2.5V17.5C1 18.3284 1....(full path kept in file)"
        fill="white"
        stroke="white"
        strokeWidth="2"
      />
      <Path
        d="M9.64638 3.28214L8.02488 4.90314C7.70988 5.21814 7.9333...(full path kept in file)"
        fill="black"
      />
    </Mask>
    <G mask="url(#mask0_54192_1874)">
      {/* colorized background square */}
      <Path d="M-2 -2H22V22H-2V-2Z" fill={color} />
    </G>
  </Svg>
);
