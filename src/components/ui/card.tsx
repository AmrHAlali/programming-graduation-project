import { colors, hp, imgRegistry, wp } from "@/core";
import React from "react";
import { View, Image, StyleSheet } from "react-native";

type CardProps = {
    children?: React.ReactNode;
    imageSource?: any;
    reverse?: boolean;
    style?: object;
};

const Card: React.FC<CardProps> = ({ children, ...props }) => {
    return (
        <View style={[styles.container, { flexDirection: props.reverse ? 'row-reverse' : 'row' }, props.style]}>
            <Image
                source={props.imageSource}
                style={styles.image}
                resizeMode="contain"
            />
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.neutrals.white,
        borderRadius: 12,
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        padding: wp(4),
        gap: wp(4),
    },
    image: {
        width: wp(24),
        borderRadius: 3.5,
    }
});

export default Card;