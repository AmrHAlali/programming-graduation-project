import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { ProfileSVG } from "@/components/ui/svg/profile";
import { ServicesSVG } from "@/components/ui/svg/services";
import { AuthStatusEnum, colors, getTypography, hp, rf, useUserStore, wp } from "@/core";
import { colorWithOpacity } from "@/core/utils/color-with-opacity";
import { Dimensions, Platform, Pressable, StyleSheet } from "react-native";
import { HomeNavigator } from "../home-stack-navigator";
import { useTabOptions } from "./tab-options";
import { HomeSVG } from "@/components/ui/svg";
import { ContestSVG } from "@/components/ui/svg/contest";
import { ProfileNavigator } from "../profile-stack-navigator";
import { CompetitionsNavigator } from "../competitions-stack-navigator";
import { TracksListScreen } from "@/screens/tracks/tracks-list";
import { AuthNavigator } from "..";
import { LeaderboardScreen } from "@/screens/leaderboard";

const Tab = createBottomTabNavigator<MainTabParamList>();

export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
  Competitions: undefined;
  Leaderboard: undefined;
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isSmallScreen = SCREEN_WIDTH < 375;
const isMediumScreen = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;

const dynamicStyles = {
  tabBarLabel: () => ({
    fontSize: isSmallScreen ? rf(11) : isMediumScreen ? rf(12) : rf(13),
    fontFamily: getTypography().primary.medium,
    textAlign: "center",
    marginTop: wp(0.5),
  }),
};

export const MainTabNavigator = () => {
  const insets = useSafeAreaInsets();

  const homeOptions = useTabOptions("Home", HomeSVG);
  const competitionsOptions = useTabOptions("Contests", ServicesSVG);
  const leaderboardOptions = useTabOptions("Scoreboard", ContestSVG);
  const profileOptions = useTabOptions("Profile", ProfileSVG);

  const {
    authStatus
  } = useUserStore();

  if(authStatus === AuthStatusEnum.UNAUTHORIZED) {
    return <AuthNavigator />;
  }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: [
          styles.tabBarStyle,
          {
            position: "absolute",
            marginHorizontal: Math.max(wp(3), Math.min(wp(5), 24)),
            bottom: insets.bottom + Math.max(hp(1), 8),
            left: SCREEN_WIDTH > 768 ? '25%' : 0,
            right: SCREEN_WIDTH > 768 ? '25%' : 0,
          },
        ],

        tabBarButton: (props) => (
          <Pressable
            {...props}
            android_ripple={{ color: colors.neutrals.transparent }}
            style={({ pressed }) => [
              props.style,
              pressed && {
                opacity: 1,
                backgroundColor: colors.neutrals.transparent,
              },
            ]}
          />
        ),

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.neutrals.gray700,

        tabBarShowLabel: true,
        tabBarItemStyle: styles.tabBarItemStyle,

        tabBarLabelStyle: dynamicStyles.tabBarLabel(),

        tabBarIconStyle: styles.tabBarIconStyle,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={homeOptions}
      />

      <Tab.Screen
        name="Competitions"
        component={CompetitionsNavigator}
        options={competitionsOptions}
      />

      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={leaderboardOptions}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          const shouldHideTabBar = routeName === 'CompetitionsList';

          return {
            ...profileOptions,
            tabBarStyle: shouldHideTabBar
              ? { display: 'none' }
              : [
                styles.tabBarStyle,
                {
                  position: "absolute",
                  marginHorizontal: Math.max(wp(3), Math.min(wp(5), 24)),
                  bottom: insets.bottom + Math.max(hp(1), 8),
                  left: SCREEN_WIDTH > 768 ? '25%' : 0,
                  right: SCREEN_WIDTH > 768 ? '25%' : 0,
                },
              ],
          };
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarIconStyle: {
    margin: 0,
    marginBottom: wp(0.8),
  },

  tabBarItemStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: "100%",
    paddingVertical: Math.max(wp(0.8), Math.min(wp(1), 6)),
    paddingHorizontal: 0,
    minWidth: isSmallScreen ? 60 : 70,
  },

  tabBarStyle: {
    borderRadius: 34.5,
    height: Math.max(hp(6.5), Math.min(hp(7.5), 70)),
    backgroundColor: colors.neutrals.white,

    ...Platform.select({
      android: {
        elevation: 6,
      },
      ios: {
        shadowColor: colors.neutrals.black,
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: -4 },
        shadowRadius: 8,
      },
    }),

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Math.max(wp(3), Math.min(wp(5), 24)),
    borderWidth: 0.5,
    borderColor: colorWithOpacity(colors.neutrals.gray700, 0.1),
  },
});
