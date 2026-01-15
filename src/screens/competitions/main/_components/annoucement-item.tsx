import { Icon, Text } from "@/components"
import { $styles, colors, hp, rf, wp } from "@/core"
import { formatDate } from "@/core/utils/datetime-utils";
import { AnnoucementType } from "@/core/types/annoucement"
import { StyleSheet, TouchableOpacity } from "react-native"
import Animated, { FadeIn, FadeOut, LinearTransition, useAnimatedStyle, withTiming } from "react-native-reanimated"

export const AnnouncementItem = ({ announcement, expandedId, onToggle }: { announcement: AnnoucementType, expandedId: string | null, onToggle: (value: string | null) => void }) => {
    const isExpanded = expandedId === announcement.id;

    const arrowStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: withTiming(isExpanded ? "180deg" : "0deg") }],
        };
    });

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onToggle(isExpanded ? null : announcement.id)}
            style={styles.container}
        >
            <Animated.View layout={LinearTransition} style={styles.header}>
                <Text preset="titleSmallBold" style={styles.text}>{announcement.title}</Text>

                {isExpanded && (
                    <Animated.View entering={FadeIn} exiting={FadeOut}>
                        <Text preset="bodySmall" style={[styles.text, { paddingEnd: wp(3) }]}>{announcement.description}</Text>
                    </Animated.View>
                )}

                <Text preset="bodySmall">{formatDate(announcement.createdAt)}</Text>
            </Animated.View>

            <Animated.View style={arrowStyle}>
                <Icon icon="arrow" size={rf(16)} />
            </Animated.View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.neutrals.white,
        borderRadius: 8,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        paddingHorizontal: wp(5),
        paddingVertical: hp(1.5),
        ...$styles.defaultShadow,
    },
    header: {
        flexShrink: 1,
        gap: hp(1),
    },
    text: {
        flexWrap: "wrap",
        flexShrink: 1,
    },
})