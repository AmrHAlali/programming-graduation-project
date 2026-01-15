import { Button, Text } from "@/components";
import { $styles, colors, hp, wp } from "@/core";
import { StyleSheet, View } from "react-native";

export const MasterNewSkills = () => {
    return (
        <View style={styles.container}>
            <Text
                preset="titleLargeBold"
                tx="New to design or front-end?"
                color={colors.neutrals.white}
            />

            <Text
                preset="titleMediumLight"
                tx="We’ll help you turn ideas into real apps with simple steps and modern tools."
                color={colors.neutrals.white}
            />

            <Button
                tx="Join Now!"
                preset="secondary"
                textPreset="titleMediumBold"
                style={{ alignSelf: "center", backgroundColor: colors.neutrals.white, flex: 1, marginTop: hp(1.5) }}
                pressedStyle={{ backgroundColor: colors.neutrals.white }}
                pressedTextStyle={{ color: colors.primaryDark }}
                textStyle={{ color: colors.primary, }}

                onPress={() => {
                    // This will lead me to our website.
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,

        borderRadius: 8,
        paddingHorizontal: wp(5),
        paddingVertical: hp(1.5),
        ...$styles.defaultShadow,
    }
});