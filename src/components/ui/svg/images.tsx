import { colors, hp, wp } from "@/core";
import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const ImagesSVG: React.FC<Props> = ({
  width = wp(14),
  height = hp(14),
  color = colors.neutrals.black,
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 60 60"
    fill="none"
    {...props}
  >
    <G clipPath="url(#clip0_54291_4910)">
      <G opacity={0.2}>
        <Path
          d="M52.5 2.5H17.5C14.7386 2.5 12.5 4.73858 12.5 7.5V42.5C12.5 45.2614 14.7386 47.5 17.5 47.5H52.5C55.2614 47.5 57.5 45.2614 57.5 42.5V7.5C57.5 4.73858 55.2614 2.5 52.5 2.5Z"
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M42.5 22.5C45.2614 22.5 47.5 20.2614 47.5 17.5C47.5 14.7386 45.2614 12.5 42.5 12.5C39.7386 12.5 37.5 14.7386 37.5 17.5C37.5 20.2614 39.7386 22.5 42.5 22.5Z"
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12.5 40L27.5 25L50 47.5M2.5 12.5V45C2.5 46.6415 2.82332 48.267 3.45151 49.7835C4.07969 51.3001 5.00043 52.6781 6.16117 53.8388C8.50537 56.183 11.6848 57.5 15 57.5H47.5"
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="clip0_54291_4910">
        <Rect width="60" height="60" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
