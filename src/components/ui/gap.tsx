import React, { type FC } from "react";
import { View } from "react-native";
import { wp, hp } from "@/core";

type GapType = "ROW" | "COL";

type GapProps = {
  gapValue: number;
  type: GapType;
};

export const Gap: FC<GapProps> = ({ gapValue, type }) => {
  return (
    <View
      style={{
        width: type === "ROW" ? wp(gapValue) : 0,
        height: type === "COL" ? hp(gapValue) : 0,
      }}
    />
  );
};
