import { ReactNode, forwardRef, ForwardedRef } from "react"
// eslint-disable-next-line no-restricted-imports
import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle, Pressable } from "react-native"
import { getFont } from "../DynamicAppTheme/fonts"

import i18next from "i18next"
import { isRTL } from "@/core"

export interface TextProps extends RNTextProps {
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>
  /**
   * Children components.
   */
  children?: ReactNode
  /**
   * Component json file.
   */
  component: any
  /**
   * Optional function to execute on press.
   */
  onPress?: () => void
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Text/}
 * @param {TextProps} props - The props for the `Text` component.
 * @returns {JSX.Element} The rendered `Text` component.
 */
export const Text = forwardRef(function Text(props: TextProps, ref: ForwardedRef<RNText>) {
  const { text, children, style: $styleOverride, component, onPress, ...rest } = props

  console.log("Rendering Text:", component)

  // Defensive check for component.value
  const value = component?.value ?? ""

  // Safe language extraction
  const lang = i18next.language?.split("-")[0] || "en"

  // Safely access translations
  const translatedValue =
    typeof value === "object"
      ? lang === "en"
        ? value?.en ?? value?.ar ?? ""
        : value?.ar ?? value?.en ?? ""
      : value

  // Preserve your original fallback order
  const content =
    translatedValue ||
    value?.en || // in case value is an object and translatedValue is empty
    text ||
    children ||
    ""

  const { fontFamily, fontWeight } = getFont(
    component.style?.fontFamily,   // e.g., "poppins"
    component.style?.fontWeight,   // e.g., "semibold" | 600 | "bold"
  )

  const $styles: StyleProp<TextStyle> = [
    $rtlStyle,
    $styleOverride,
    component.style,
    { fontFamily, fontWeight }
  ]

  return (
    <Pressable onPress={onPress || undefined}>
      <RNText {...rest} style={$styles} ref={ref}>
        {content}
      </RNText>
    </Pressable>
  )
})

const $rtlStyle: TextStyle = isRTL() ? { writingDirection: "rtl" } : {}
