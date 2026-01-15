import { StyleProp, TextStyle } from "react-native";
import { PressableStateCallbackType } from "react-native-gesture-handler";

export type TextPresetConfig = {
  preset: string;
  style: StyleProp<TextStyle>;
};

export interface ButtonAccessoryProps {
  style: StyleProp<any>;
  pressableState: PressableStateCallbackType;
  disabled?: boolean;
}