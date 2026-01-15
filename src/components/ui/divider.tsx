import { colors, hp } from "@/core";
import { StyleSheet, View } from "react-native";

export const Divider = () => {
    return(
        <View style={styles.divider} />
    );
}

const styles = StyleSheet.create({
    divider: {
        height: 0.5,
        backgroundColor: colors.neutrals.gray600,
        marginVertical: hp(1),
    },
});