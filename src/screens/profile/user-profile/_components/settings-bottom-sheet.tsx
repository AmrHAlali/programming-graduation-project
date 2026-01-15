import { Button, Text } from "@/components";
import { AuthStatusEnum, colors, hp, useUserStore, wp } from "@/core";
import { AppStackNavigationProp } from "@/screens/navigation";
import { ProfileStackNavigationProp } from "@/screens/navigation/profile-stack-navigator";
import { useNavigation } from "@react-navigation/native";
import { RefObject } from "react";
import { StyleSheet, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { Pressable } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const SettingsBottomSheet = ({ ref } : { ref: RefObject<ActionSheetRef | null> }) => {
    const navigation = useNavigation<AppStackNavigationProp>();

    return (
        <ActionSheet ref={ref}>
            <View style={[styles.conatiner, { paddingBottom: useSafeAreaInsets().bottom + hp(8) }]}>
                <Pressable
                    onPress={() => {
                        navigation.replace("Auth", {
                            screen: "login" as any,
                        });
                        useUserStore.setState({ authStatus: AuthStatusEnum.UNAUTHORIZED });
                    }}
                    style={styles.button}
                >
                    <Text preset="titleMediumBold" color={colors.neutrals.white} >
                        Log Out
                    </Text>
                </Pressable>
            </View>
        </ActionSheet>
    );
}

const styles = StyleSheet.create({
    conatiner: {
        paddingHorizontal: wp(5),
        paddingVertical: hp(2),
    },
    button: {
        backgroundColor: colors.neutrals.gray700,
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(5),
        alignItems: "center",
        borderRadius: 8,
    }
});