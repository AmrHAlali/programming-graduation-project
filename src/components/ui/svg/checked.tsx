import { colors, hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path, Circle, Rect, Polygon, Ellipse, Line, Polyline } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
};

export const CheckedSVG: React.FC<Props> = ({
  width = wp(6),
  height = wp(6),
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 22 18"
    fill="currentColor"
    {...props}
  >
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M1 9L3.5 6.5L8.5 11.5L18.5 1.5L21 4L8.5 16.5L1 9Z" fill="#1DC067" stroke="#1DC067" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </Svg>
);
