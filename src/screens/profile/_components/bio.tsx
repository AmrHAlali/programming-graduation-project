import { Text } from "@/components";
import { colors, hp } from "@/core";
import { StyleSheet, View } from "react-native";

export const Bio = ({ content } : { content: string }) => {
    return (
        <View style={styles.container}>
            <Text
                tx="About Me"
                preset="titleLargeBold"
            />

            <View>
                <Text
                    preset="bodyMediumBold"
                    color={colors.neutrals.gray650}
                >
                    {content}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: hp(1.5)
    },
});