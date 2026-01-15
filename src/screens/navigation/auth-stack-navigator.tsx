import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { AppStackParamList, AppStackScreenProps } from './app-stack-navigator';
import { RegisterScreen } from '../authentication/register';
import { LoginScreen } from '../authentication/login';
import { useUserStore } from '@/core';
import { OnboardingScreen } from '../authentication/onboarding';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Onboarding: undefined;
};

export type AuthStackNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AuthStackParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
  >;

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  const { isFirstTime } = useUserStore();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isFirstTime ? 'Onboarding' : 'Login'}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
