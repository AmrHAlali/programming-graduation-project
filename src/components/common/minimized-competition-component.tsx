import { Text } from "@/components";
import { colors, hp, wp, MinimizedCompetition } from "@/core";
import { goToShared } from "@/screens/navigation/shared-navigation";
import { StyleSheet, TouchableOpacity, View } from "react-native";



export const MinimizeedCompetitionComponent = ({ id, title }: MinimizedCompetition) => {
    return (
        <TouchableOpacity
            key={id}
            activeOpacity={.4}
            style={styles.container}
            onPress={() => {
                goToShared("CompetitionDetails", { id });
            }}
        >
            <View
                key={id}
                style={styles.content}
            >
                <View style={[styles.trackTag, { backgroundColor: colors.neutrals.gray600 }]} />

                <View style={styles.textContainer}>
                    <Text preset="bodySmallBold" color={colors.neutrals.white} numberOfLines={2} ellipsizeMode="tail">
                        {title}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.neutrals.gray500,
        borderRadius: 12,
        alignSelf: "flex-start",
    },
    content: {
        flexDirection: "row",
        borderRadius: 12,
    },
    trackTag: {
        height: "100%",
        width: wp(4),
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
    },
    textContainer: {
        flexShrink: 1,
        paddingVertical: hp(0.5),
        paddingHorizontal: wp(3),
        gap: hp(0.25),
    },
});
