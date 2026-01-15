import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

type Percent = `${number}%`;

export interface GridProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  columns?: number;     // number of columns
  gap?: number;         // spacing between cells (both axes)
  style?: ViewStyle;    // optional extra styles for the grid container
}

export default function Grid<T>({
  data,
  renderItem,
  columns = 3,
  gap = 10,
  style,
}: GridProps<T>) {
  const cellWidth = `${100 / columns}%` as Percent;

  return (
    <View style={[styles.container, style, { margin: -gap / 2 }]}>
      {data.map((item, index) => (
        <View key={index} style={{ width: cellWidth, padding: gap / 2 }}>
          {/* This inner view stretches to match tallest sibling in the same row */}
          <View style={styles.cellInner}>{renderItem(item, index)}</View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch", // equal height per row
  },
  cellInner: {
    flex: 1, // important: lets child fill the stretched height
  },
});
