import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const Snowflake = () => {
    const fallAnim = useRef(new Animated.Value(0)).current;
    const leftPos = Math.random() * width;
    const size = 4 + Math.random() * 6; // random size for each snowflake
    const duration = 4000 + Math.random() * 4000;

    useEffect(() => {
        Animated.loop(
            Animated.timing(fallAnim, {
                toValue: height,
                duration,
                useNativeDriver: true,
            })
        ).start();
    }, [fallAnim, duration]);

    return (
        <Animated.View
            style={[
                styles.snowflake,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    left: leftPos,
                    transform: [{ translateY: fallAnim }],
                    opacity: 0.7,
                },
            ]}
        />
    );
};

export default function SnowfallOverlay({ children }: any) {
    return (
        <View style={styles.container}>
            {children}
            {/* Overlay snowflakes */}
            <View pointerEvents="none" style={StyleSheet.absoluteFill}>
                {Array.from({ length: 40 }).map((_, i) => (
                    <Snowflake key={i} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    snowflake: {
        position: 'absolute',
        backgroundColor: 'white',
    },
});
