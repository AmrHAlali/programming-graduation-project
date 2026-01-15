import { Alert, Linking, Platform } from "react-native";
import { check, request, RESULTS, PERMISSIONS, openSettings } from "react-native-permissions";
import { showMessage } from "react-native-flash-message";
import { getFlashMessageStyle } from "@/providers";
import * as ImagePicker from "expo-image-picker";

export const requestCameraPermission = async (t: any): Promise<boolean> => {
  const permission =
    Platform.OS === "ios"
      ? PERMISSIONS.IOS.CAMERA
      : PERMISSIONS.ANDROID.CAMERA;

  // Step 1: Check current permission
  const status = await check(permission);

  switch (status) {
    case RESULTS.GRANTED:
      return true;

    case RESULTS.BLOCKED:
      // User denied permanently → must open settings
      showMessage({
        message: t("auth.common.camera-permission-settings"),
        ...getFlashMessageStyle().error,
      }); Alert.alert(
        t("auth.common.camera-permission-title"),
        t("auth.common.camera-permission-settings-message"),
        [
          { text: t("common.cancel"), style: "cancel" },
          { text: t("common.open-settings"), onPress: () => openSettings() },
        ]
      );
      return false;

    case RESULTS.DENIED:
    case RESULTS.LIMITED:
    default:
      // Step 2: Request permission
      const newStatus = await request(permission);
      if (newStatus === RESULTS.GRANTED) {
        return true;
      }

      if (newStatus === RESULTS.BLOCKED) {
        showMessage({
          message: t("auth.common.camera-permission-settings"),
          ...getFlashMessageStyle().error,
        });
        Alert.alert(
          t("auth.common.camera-permission-title"),
          t("auth.common.camera-permission-settings-message"),
          [
            { text: t("common.cancel"), style: "cancel" },
            { text: t("common.open-settings"), onPress: () => Linking.openSettings() },
          ]
        );
      } else {
        Alert.alert(
          t("auth.common.camera-permission-title"),
          t("auth.common.camera-permission-denied"),
          [{ text: t("common.ok") }]
        );
      }

      return false;
  }
};

export const launchCamera = async () => {
  const result = await ImagePicker.launchCameraAsync({
    allowsMultipleSelection: true,
    quality: 1,
    videoMaxDuration: 120,
  });
  return result;
};