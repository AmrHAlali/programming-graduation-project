import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { AppStackParamList, AppStackScreenProps } from './app-stack-navigator';
import { Profile } from '../profile/my-profile';
import { SettingsScreen } from '../profile/settings';
import { FollowersListScreen } from '../profile/users-list/followers-list';
import { FollowingListScreen } from '../profile/users-list/following-list';

export type ProfileStackParamList = {
  MyProfile: undefined;
  Settings: undefined;
  FollowersList: { username: string; title?: string };
  FollowingList: { username: string; title?: string };
};

export type ProfileStackNavigationProp =
  NativeStackNavigationProp<ProfileStackParamList>;

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ProfileStackParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
  >;

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileNavigator = ({ initialRouteName = "MyProfile" }: { initialRouteName?: keyof ProfileStackParamList }) => {

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name="MyProfile" component={Profile} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="FollowersList" component={FollowersListScreen} />
      <Stack.Screen name="FollowingList" component={FollowingListScreen} />
    </Stack.Navigator>
  );
};
