import { Screen, Text } from "@/components";
import { colors, hp, useUserStore, wp } from "@/core";
import { AppStackNavigationProp } from "@/screens/navigation";
import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";

export const SettingsScreen = () => {
    const navigation = useNavigation<AppStackNavigationProp>();

    const handleLogout = () => {
        navigation.replace("Auth", {
            screen: "login" as any,
        });
        useUserStore.getState().removeUserCredential();
    };

    return (
        <Screen contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text preset="headingSmallBold" color={colors.neutrals.gray700}>
                    Settings
                </Text>
            </View>

            <Pressable onPress={handleLogout} style={styles.logoutButton}>
                <Text preset="titleLarge" color={colors.neutrals.white}>
                    Log Out
                </Text>
            </Pressable>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(5),
        paddingVertical: hp(4),
        backgroundColor: colors.neutrals.white,
        gap: hp(3),
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        gap: wp(3),
    },
    logoutButton: {
        backgroundColor: colors.primaryDeep,
        paddingVertical: hp(1),
        paddingHorizontal: wp(5),
        alignItems: "center",
        borderRadius: 6,
    },
});