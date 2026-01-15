import { Icon, Text } from "@/components";
import { AuthStatusEnum, colors, hp, useUserStore, wp } from "@/core";
import { AppStackNavigationProp } from "@/screens/navigation";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LogOutButton } from "./_components/logout-button";

export const ProfileDrawer = () => {
    const navigation = useNavigation<AppStackNavigationProp>();
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: insets.top + hp(2),
                    paddingBottom: insets.bottom + hp(4),
                },
            ]}
        >
            <View style={styles.header}>                
                <Text preset="headingSmallBold" color={colors.neutrals.gray700}>
                    Settings
                </Text>
            </View>

            <LogOutButton navigation={navigation} style={styles.button} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(5),
        backgroundColor: colors.neutrals.white,
        gap: hp(3),
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        gap: wp(3),
    },
    button: {
        backgroundColor: colors.primaryDeep,
        paddingVertical: hp(1),
        paddingHorizontal: wp(5),
        alignItems: "center",
        borderRadius: 6,
    },
});