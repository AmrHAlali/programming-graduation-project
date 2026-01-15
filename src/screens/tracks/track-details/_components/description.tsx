import { Text } from "@/components";
import { colors, hp, wp } from "@/core";
import { StyleSheet, View } from "react-native";

export const TrackDescription = ({ description }: { description: string }) => {
    return (
        <View style={styles.content}>
            <Text
                tx="Description"
                preset="titleLargeBold"
            />

            <View>
                <Text
                    preset="bodyMediumBold"
                    color={colors.neutrals.gray650}
                >
                    {description}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: hp(3),
        paddingHorizontal: wp(5),
        backgroundColor: colors.background,
    },
    content: {
        gap: hp(1.5),
        paddingTop: hp(3),
    }
});