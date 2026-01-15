import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { AppStackParamList, AppStackScreenProps } from './app-stack-navigator';
import { Main } from '../competitions/main';

export type CompetitionsStackParamList = {
  Main: undefined;
};

export type CompetitionsStackNavigationProp =
  NativeStackNavigationProp<CompetitionsStackParamList>;

export type CompetitionsStackScreenProps<T extends keyof CompetitionsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<CompetitionsStackParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
  >;

const Stack = createNativeStackNavigator<CompetitionsStackParamList>();

export const CompetitionsNavigator = ({ initialRouteName = "Main" }: { initialRouteName?: keyof CompetitionsStackParamList }) => {

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
};
