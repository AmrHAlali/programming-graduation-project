// dynamic/Helpers/mapOnPress.ts
import { Linking, Alert, Vibration, ToastAndroid, Platform } from "react-native"
import type { NavigationProp } from "@react-navigation/native"

type OnPressAction =
  | { type: "navigate"; target: string; params?: Record<string, any> }
  | { type: "openUrl"; url: string }
  | { type: "alert"; title: string; message?: string }
  | { type: "back" }
  | { type: "toast"; message: string; duration?: "short" | "long" }
  | { type: "custom"; callbackName: string; args?: any }
  | { type: "sequence"; actions: OnPressAction[] }
  | { type: "delay"; ms: number; next?: OnPressAction }
  | { type: "vibrate"; duration?: number }
  | { type: "none" }
  | undefined

export function mapOnPress(
  component: any,
  navigation?: NavigationProp<any>,
  customHandlers?: Record<string, (args?: any) => void>,
): (() => void) | undefined {
  if (!component) return undefined
  const { onPress, navigateTo, params } = component

  if (!onPress && !navigateTo) return undefined

  return () => {
    try {
      // Run onPress logic first
      if (onPress) {
        handleAction(onPress, navigation, customHandlers)
      }

      // Then run navigateTo if provided
      if (navigateTo) {
        if (!navigation) console.warn("No navigation provided for navigateTo")
        else navigation.navigate(navigateTo, params as never)
      }
    } catch (err) {
      console.error("Error executing onPress:", err)
    }
  }
}

/**
 * Handle individual or sequence actions recursively and asynchronously.
 */
async function handleAction(
  action: OnPressAction,
  navigation?: NavigationProp<any>,
  customHandlers?: Record<string, (args?: any) => void>,
): Promise<void> {
  if (!action || action.type === "none") return

  switch (action.type) {
    /** 🧭 Navigate */
    case "navigate":
      if (!navigation) return console.warn("No navigation provided")
      navigation.navigate(action.target, action.params as never)
      break

    /** 🌐 Open external link */
    case "openUrl":
      try {
        await Linking.openURL(action.url)
      } catch (err) {
        console.error("Failed to open URL:", err)
      }
      break

    /** 🪧 Native alert */
    case "alert":
      Alert.alert(action.title, action.message || "")
      break

    /** ⬅️ Go back */
    case "back":
      if (navigation?.canGoBack()) navigation.goBack()
      break

    /** 📣 Toast message */
    case "toast":
      if (Platform.OS === "android") {
        ToastAndroid.show(
          action.message || " ",
          action.duration === "long"
            ? ToastAndroid.LONG
            : ToastAndroid.SHORT,
        )
      } else {
        Alert.alert("", action.message || "")
      }
      break

    /** 📳 Vibrate */
    case "vibrate":
      Vibration.vibrate(action.duration || 100)
      break

    /** ⚙️ Custom callback */
    case "custom":
      const handler = customHandlers?.[action.callbackName]
      if (handler) handler(action.args)
      else console.warn(`No custom handler registered for ${action.callbackName}`)
      break

    /** ⏱️ Delay before next */
    case "delay":
      await new Promise((resolve) =>
        setTimeout(resolve, action.ms || 0),
      )
      if (action.next) await handleAction(action.next, navigation, customHandlers)
      break

    /** 🔗 Run actions in order (waits between them) */
    case "sequence":
      for (const subAction of action.actions) {
        await handleAction(subAction, navigation, customHandlers)
      }
      break

    default:
      console.warn("Unknown onPress type:", action)
  }
}
