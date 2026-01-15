import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { AppStackParamList, AppStackScreenProps } from './app-stack-navigator';
import { Home } from '../home/main';

export type HomeStackParamList = {
  Main: undefined;
};

export type HomeStackNavigationProp =
  NativeStackNavigationProp<HomeStackParamList>;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
  >;

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeNavigator = ({ initialRouteName = "Main" }: { initialRouteName?: keyof HomeStackParamList }) => {

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name="Main" component={Home} />
    </Stack.Navigator>
  );
};
