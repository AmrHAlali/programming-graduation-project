import { colors, hp, wp } from "@/core";
import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
};

export const CommissionSVG: React.FC<Props> = ({
  width = wp(8),
  height = hp(8),
  color = colors.neutrals.gray600,
  strokeWidth = 1.8,
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 64 64"
    fill="none"
    {...props}
  >
    {/* Main shape */}
    <Path
      d="M54.836 41.196c-.741-.624-1.72-.883-2.664-.719L32.34 43.926l-5.633-5.633A1 1 0 0 0 26 38H16c0-.552-.447-1-1-1h-4H4v2h6v14H4v2h7h4c.553 0 1-.448 1-1h2.764l10.691 5.346c.463.231.963.347 1.463.346.568 0 1.137-.149 1.646-.446L54.38 46.52c.999-.584 1.62-1.666 1.62-2.823 0-.967-.425-1.879-1.164-2.501ZM14 53h-2V39h2v14Zm39.371-8.207L31.556 57.518c-.37.216-.821.231-1.206.039l-10.902-5.451A1 1 0 0 0 19 52h-3V40h9.586l7.879 7.878A3 3 0 0 1 34 49.171C34 50.18 33.18 51 32.172 51c-.481 0-.952-.195-1.293-.536l-5.172-5.171-1.414 1.414 5.172 5.171A4.17 4.17 0 0 0 32.172 53C34.282 53 36 51.283 36 49.171c0-1.022-.398-1.983-1.121-2.707l-.809-.809 18.444-3.208c.372-.065.747.038 1.034.279.287.241.452.595.452.97 0 .449-.241.869-.629 1.096Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />

    {/* angled bar */}
    <Path
      d="m26.567 19.5 10.99 9.999 3.876-4.267-10.99-9.999-3.876 4.267Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />

    {/* small circle left */}
    <Path
      d="M30 20.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0-4c.552 0 1 .449 1 1s-.448 1-1 1-1-.449-1-1 .448-1 1-1Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />

    {/* small circle right */}
    <Path
      d="M35 23.5a3 3 0 1 0 6 0 3 3 0 0 0-6 0Zm4 0c0 .551-.448 1-1 1s-1-.449-1-1 .448-1 1-1 1 .449 1 1Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />

    {/* outer heart-like shape */}
    <Path
      d="M33.274 41.688c.19.199.452.312.726.312s.536-.113.726-.312l15.858-16.708c4.542-4.786 4.542-12.573 0-17.358C48.367 5.286 45.416 4 42.274 4 39.148 4 36.212 5.272 34 7.584 31.788 5.272 28.852 4 25.726 4c-3.142 0-6.093 1.286-8.31 3.622-4.542 4.786-4.542 12.573 0 17.358l15.858 16.708Zm-14.407-32.689C20.702 7.065 23.138 6 25.726 6c2.589 0 5.024 1.065 6.859 2.999l.689.727c.379.397 1.072.397 1.451 0l.689-.727C37.25 7.065 39.686 6 42.274 6c2.588 0 5.023 1.065 6.858 2.999 3.822 4.026 3.822 10.578 0 14.604L34 39.547 18.867 23.603c-3.822-4.026-3.822-10.578 0-14.604Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />

    {/* three small square dots */}
    <Rect x="29" y="28" width="2" height="2" stroke={color} strokeWidth={strokeWidth} />
    <Rect x="33" y="28" width="2" height="2" stroke={color} strokeWidth={strokeWidth} />
    <Rect x="37" y="28" width="2" height="2" stroke={color} strokeWidth={strokeWidth} />
  </Svg>
);
