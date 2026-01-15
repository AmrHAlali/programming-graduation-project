import { StyleSheet, View } from "react-native";
import { Button, Text } from "@/components";
import { TxKeyPath, wp, hp, colors } from "@/core";
import { useNavigation } from "@react-navigation/native";
import { Circles } from "./circles";
import { useUserStore } from "@/core/store/features/user/use-user-store";
import { AppStackNavigationProp } from "@/screens/navigation";
import { onboardingScreenProps } from "@/core/types/onboarding-types";
import { OnboardingData } from "@/core/constants/onboarding-data";

export function OnboardingBox({ length, setPage, activePage, page }: onboardingScreenProps) {
  const navigation = useNavigation<AppStackNavigationProp>();
  const setIsFirstTime = useUserStore((state) => state.setIsFirstTime);

  const handleButtonPress = () => {
    if (activePage === length - 1) {
      setIsFirstTime(false);
      navigation.replace("MainTabs");
    } else {
      setPage(activePage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Circles length={OnboardingData.length} active={activePage} />

      <Text
        style={styles.title}
        preset="headingMedium"
        tx={page.title as TxKeyPath}
      />

      <Text
        style={styles.subTitle}
        preset="titleMediumLight"
        tx={page.subtitle as TxKeyPath}
      />

      <Button
        preset="secondary"
        tx={page.buttonText as TxKeyPath}
        onPress={handleButtonPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: hp(10),
    backgroundColor: colors.neutrals.white,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    paddingHorizontal: wp(5),
    gap: hp(2),
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    color: colors.primaryDeep,
  },
  subTitle: {
    textAlign: "center",
    color: colors.primaryDark,
  },
});
