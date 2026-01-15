import { colors, hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const HouseSVG: React.FC<Props> = ({
  width = wp(6),
  height = hp(7),
  color = colors.primary,
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 19 21"
    fill="none"
    {...props}
  >
    <Path
      d="M2.81075 20.0003C1.53458 20.0003 0.5 18.9386 0.5 17.6278V8.0923C0.5 7.37188 0.819584 6.68938 1.36667 6.2398L7.72258 1.0203C8.12868 0.684014 8.63941 0.5 9.16667 0.5C9.69393 0.5 10.2047 0.684014 10.6108 1.0203L16.9656 6.2398C17.5137 6.68938 17.8333 7.37188 17.8333 8.0923V17.6278C17.8333 18.9386 16.7988 20.0003 15.5226 20.0003H2.81075Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.45825 20V14.0417C6.45825 13.467 6.68653 12.9159 7.09285 12.5096C7.49918 12.1033 8.05028 11.875 8.62492 11.875H9.70825C10.2829 11.875 10.834 12.1033 11.2403 12.5096C11.6466 12.9159 11.8749 13.467 11.8749 14.0417V20"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
