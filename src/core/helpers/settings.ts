import { BackHandler, Linking } from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';
import { isAndroid, isIOS } from '../utils';

export const openWifiSettings = async () => {
  try {
    if (isAndroid) {
      await IntentLauncher.startActivityAsync(
        IntentLauncher.ActivityAction.WIFI_SETTINGS
      );
    } else if (isIOS) {
      await Linking.openSettings();
    }
  } catch (e) {
    console.warn("Failed to open settings:", e);
  }
};

export const closeApp = async () => {
  BackHandler.exitApp();
};