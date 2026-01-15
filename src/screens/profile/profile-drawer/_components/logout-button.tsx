import { Text } from "@/components";
import { colors, useUserStore } from "@/core";
import { AppStackNavigationProp } from "@/screens/navigation";
import { Pressable } from "react-native-gesture-handler";

export const LogOutButton = ({ navigation, style }: { navigation: AppStackNavigationProp; style?: any }) => {
    return (
        <Pressable
            onPress={() => {
                (navigation as any).closeDrawer?.();
                navigation.replace("Auth", {
                    screen: "login" as any,
                });
                // Fully clear persisted user credentials and auth state on logout
                useUserStore.getState().removeUserCredential();
            }}
            style={[style, {
                backgroundColor: colors.neutrals.gray700,
            }]}
        >
            <Text preset="titleLarge" color={colors.neutrals.white}>
                Log Out
            </Text>
        </Pressable>
    );
}