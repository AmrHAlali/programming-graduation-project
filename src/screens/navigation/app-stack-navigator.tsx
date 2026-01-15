import type React from "react";
import { NavigationContainer, type NavigatorScreenParams } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { AuthNavigator, type AuthStackParamList } from "./auth-stack-navigator";
import { MainTabNavigator } from "./bottom-navigation-bar/main-navigator";
import { useUserStore } from "@/core/store/features/user/use-user-store";
import { navigationRef } from "./navigation-ref";
import { SharedNavigator, SharedStackParamList } from "./shared-stack-navigator";
import { AuthStatusEnum } from "@/core";

export interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> { }

export type AppStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  MainTabs: undefined;
  Shared: NavigatorScreenParams<SharedStackParamList>;
};

export type AppStackNavigationProp = NativeStackNavigationProp<AppStackParamList>;

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<AppStackParamList, T>;

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
  const isAuthenticated = useUserStore((state) => state.authStatus) !== AuthStatusEnum.UNAUTHORIZED;

  const token = useUserStore((state) => state.authDetails?.token);
  console.log("token in app navigator:", token);
  
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isAuthenticated ? 'MainTabs' : "Auth"} >
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Shared" component={SharedNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
