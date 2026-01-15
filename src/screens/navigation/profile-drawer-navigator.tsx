import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { colors, wp } from "@/core";
import { ProfileNavigator } from "./profile-stack-navigator";
import { ProfileDrawer } from "../profile/profile-drawer";

export type ProfileDrawerParamList = {
  ProfileStack: undefined;
};

const Drawer = createDrawerNavigator<ProfileDrawerParamList>();

export const ProfileDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="ProfileStack"
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        swipeEnabled: true,
        drawerPosition: "right",
        drawerStyle: {
          width: wp(70),
          backgroundColor: colors.neutrals.gray700,
        },
        overlayColor: "rgba(0,0,0,0.4)",
      }}
      drawerContent={() => <ProfileDrawer />}
    >
      <Drawer.Screen name="ProfileStack" component={ProfileNavigator} />
    </Drawer.Navigator>
  );
};
