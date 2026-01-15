import React, { useCallback, useRef, useState } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { Pressable } from "react-native-gesture-handler";

import { Icon } from "@/components";
import { colors, useUserStore } from "@/core";
import { useRemoveFavoriteTrack } from "@/core/hooks/tracks/use-remove-favorite-track";
import { useAddFavoriteTrack } from "@/core/hooks/tracks/use-add-favorite-track";

interface ToggleFavoriteProps {
  initialFavourite?: boolean;
  isFavourite?: boolean;
  onToggle?: (isFavourite: boolean) => void;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
  trackId: number;
}

export const ToggleFavorite: React.FC<ToggleFavoriteProps> = ({
  initialFavourite = false,
  isFavourite: controlledIsFavourite,
  onToggle,
  size = 25,
  activeColor = colors.tracks.favorite,
  trackId,
}) => {
  const [uncontrolledFavourite, setUncontrolledFavourite] = useState(initialFavourite);
  const [isLoading, setIsLoading] = useState(false);

  const isControlled = controlledIsFavourite !== undefined;
  const isFavourite = isControlled ? controlledIsFavourite : uncontrolledFavourite;

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const { removeFavoriteTrack } = useRemoveFavoriteTrack();
  const { addFavoriteTrack } = useAddFavoriteTrack();
  const username = useUserStore((state) => state.authDetails?.username);

  const bounce = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1.3,
      friction: 2,
      tension: 150,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 2,
        tension: 150,
        useNativeDriver: true,
      }).start();
    });
  }, [scaleAnim]);

  const rotate = useCallback(() => {
    rotateAnim.setValue(0);
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [rotateAnim]);

  const applyToggleUi = useCallback(
    (nextValue: boolean) => {
      bounce();
      rotate();

      if (!isControlled) {
        setUncontrolledFavourite(nextValue);
      }

      if (onToggle) {
        onToggle(nextValue);
      }
    },
    [bounce, isControlled, onToggle, rotate]
  );

  const toggleFavourite = useCallback(async () => {
    if (isLoading) {
      return isFavourite;
    }

    const nextValue = !isFavourite;

    // If we don't have a username, avoid calling the API
    if (!username) {
      return isFavourite;
    }

    try {
      setIsLoading(true);
      if (nextValue) {
        await addFavoriteTrack({ trackId, userId: username });
      } else {
        await removeFavoriteTrack({ trackId, userId: username });
      }
      applyToggleUi(nextValue);
    } catch (e) {
      // Optionally log or handle error here
    } finally {
      setIsLoading(false);
    }

    return nextValue;
  }, [addFavoriteTrack, applyToggleUi, isFavourite, isLoading, removeFavoriteTrack, trackId, username]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "20deg"],
  });

  const handlePress = useCallback(() => {
    if (isLoading) {
      return;
    }
    void toggleFavourite();
  }, [isLoading, toggleFavourite]);

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityState={{ selected: isFavourite }}
      style={{ opacity: isLoading ? 0.5 : 1 }}
    >
      <Animated.View
        style={[
          styles.iconWrapper,
          {
            transform: [{ scale: scaleAnim }, { rotate: rotation }],
            shadowColor: isFavourite ? activeColor : "transparent",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: isFavourite ? 0.8 : 0,
            shadowRadius: isFavourite ? 8 : 0,
            elevation: isFavourite ? 8 : 0,
          },
        ]}
      >
        <Animated.View>
          <Icon icon={isFavourite ? "star" : "outlinedStar"} size={size} />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
});
