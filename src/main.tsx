import Providers from "./providers";
import { AppNavigator } from "./screens/navigation/app-stack-navigator";
import * as SplashScreen from "expo-splash-screen";

export default function Main() {
  SplashScreen.preventAutoHideAsync();

  return (
    <Providers hideSplashScreen={SplashScreen.hideAsync}>
      {/* <SnowfallOverlay> */}
      <AppNavigator />
      {/* </SnowfallOverlay> */}
    </Providers>
  );
}
