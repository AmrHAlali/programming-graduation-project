import { colors, hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path, Mask, G } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const RealEstateAgeSVG: React.FC<Props> = ({
  width = wp(8),
  height = hp(8),
  color = colors.neutrals.gray600,
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 22 21"
    fill="none"
    {...props}
  >
    <Mask
      id="mask0"
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={22}
      height={21}
    >
      <Path
        d="M1 20H21"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 12H4C3.44772 12 3 12.4477 3 13V19C3 19.5523 3.44772 20 4 20H6C6.55228 20 7 19.5523 7 19V13C7 12.4477 6.55228 12 6 12Z"
        fill="white"
        stroke="white"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M5 16H5.5"
        stroke="black"
        strokeWidth={2}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <Path
        d="M18 1H8C7.44772 1 7 1.44772 7 2V19C7 19.5523 7.44772 20 8 20H18C18.5523 20 19 19.5523 19 19V2C19 1.44772 18.5523 1 18 1Z"
        fill="white"
        stroke="white"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M10 4H12V6H10V4ZM14 4H16V6H14V4ZM10 7.5H12V9.5H10V7.5ZM14 7.5H16V9.5H14V7.5ZM14 11H16V13H14V11ZM14 14.5H16V16.5H14V14.5Z"
        fill="black"
      />
    </Mask>

    <G mask="url(#mask0)">
      <Path d="M-1 -1H23V23H-1V-1Z" fill={color} />
    </G>
  </Svg>
);
