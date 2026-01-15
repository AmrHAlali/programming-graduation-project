import { useCallback, useEffect } from "react";
import { BackHandler, Platform } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export function useAppBack({ onBackPress }: {onBackPress?: (proceed: () => void) => void}) {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      // 1️⃣ Intercept navigation back (iOS: button + gesture, Android: navigation.goBack)
      const beforeRemove = navigation.addListener("beforeRemove", (e) => {
        // Stop default back behavior
        e.preventDefault();

        // Call user handler
        if (onBackPress) onBackPress(() => {
          // Continue navigation when user allows
          navigation.dispatch(e.data.action);
        });
      });

      // 2️⃣ Intercept Android hardware back button
      const handleHardwareBack = () => {
        if (onBackPress) {
          onBackPress(() => {
            navigation.goBack();
          });
        }
        return true; // prevent default behavior
      };

      let backHandlerListener: ReturnType<typeof BackHandler.addEventListener> | null = null;

      if (Platform.OS === "android") {
        backHandlerListener = BackHandler.addEventListener("hardwareBackPress", handleHardwareBack);
      }

      return () => {
        beforeRemove();
        if (Platform.OS === "android") {
          backHandlerListener?.remove();
        }
      };
    }, [navigation, onBackPress])
  );
}
