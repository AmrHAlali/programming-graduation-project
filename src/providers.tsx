import React, { useEffect, useCallback } from "react";
import {
  getScreenDimensions,
  hp,
  rf,
  wp,
  customFontsToLoad,
  colors,
  getTypography,
} from "@/core";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FlashMessage from "react-native-flash-message";
import { ViewStyle } from "react-native";
import { useAppStore } from "./core/store/features/app/use-app-store";
import { InternetError } from "./screens/internet-error";
import { CheckRankUpdateWrapper } from "./components/common/check-rank-update-wrapper";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(failureCount, error) {
        if (error?.message === "Network Error") return false;
        return failureCount < 2;
      },
    },
  },
});

type ProvidersProps = {
  hideSplashScreen: () => Promise<void>;
  children: React.ReactNode;
};

export default function Providers({ children, hideSplashScreen }: ProvidersProps) {
  getScreenDimensions();

  const { initialized, initAppLanguage } = useAppStore();

  useEffect(() => {
    initAppLanguage();
  }, []);

  const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad);

  const onLayoutRootView = useCallback(async () => {
    if (areFontsLoaded && initialized && !fontLoadError) {
      await hideSplashScreen();
    }
  }, [areFontsLoaded, initialized, fontLoadError]);

  if (!areFontsLoaded || !initialized) {
    return null;
  }

  const typography = getTypography();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider
        initialMetrics={initialWindowMetrics}
        onLayout={onLayoutRootView}
      >
        <QueryClientProvider client={queryClient}>
          <InternetError>
            <CheckRankUpdateWrapper>
              {children}
            </CheckRankUpdateWrapper>
            <FlashMessage
              position="top"
              duration={3000}
              hideOnPress
              floating
              type="none"
              statusBarHeight={hp(3)}
              textStyle={getBaseTextStyle()}
              titleStyle={getBaseTitleStyle()}
              animated
            />
          </InternetError>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const baseStyle: ViewStyle = {
  borderRadius: 16,
  marginTop: hp(1),
  marginHorizontal: wp(4),
  borderWidth: 0,
  borderColor: colors.neutrals.white,
  shadowColor: colors.neutrals.black,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 10,
  elevation: 8,
  paddingVertical: hp(1.8),
  paddingHorizontal: wp(4),
};

export const getBaseTitleStyle = () => {
  const typography = getTypography();

  return {
    fontFamily: typography.primary.bold,
    fontSize: rf(15),
    color: colors.neutrals.white,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  };
};

export const getBaseTextStyle = () => {
  const typography = getTypography();

  return {
    fontFamily: typography.primary.light,
    fontSize: rf(13),
    color: "rgba(255, 255, 255, 0.9)",
  };
};

export const getFlashMessageStyle = () => {
  const titleStyle = getBaseTitleStyle();
  const textStyle = getBaseTextStyle();

  return {
    success: {
      statusBarHeight: hp(3),
      style: { ...baseStyle, backgroundColor: colors.primaryDark, opacity: 0.9 },
      titleStyle,
      textStyle,
    },

    error: {
      statusBarHeight: hp(3),
      style: { ...baseStyle, backgroundColor: colors.states.errorDark, opacity: 0.9 },
      titleStyle,
      textStyle,
    },

    warning: {
      statusBarHeight: hp(3),
      style: { ...baseStyle, backgroundColor: colors.states.warning, opacity: 0.9 },
      titleStyle,
      textStyle,
    },
  };
};
