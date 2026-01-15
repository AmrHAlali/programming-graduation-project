import { Text } from "@/components";
import { hp, wp } from "@/core";
import React, { memo, useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ToggleFavorite } from "./toggle-favorite";
import { goToShared } from "@/screens/navigation/shared-navigation";
import { Pressable } from "react-native-gesture-handler";

type TrackItemProps = {
    id: number;
    label: string;
    backgroundColor: string;
    textColor: string;
    isFavourite?: boolean;
};

export const TrackItem = memo(({ label, id, backgroundColor, textColor, isFavourite = false }: TrackItemProps) => {
    const [isFavouriteState, setIsFavouriteState] = useState(isFavourite);

    useEffect(() => {
        setIsFavouriteState(isFavourite);
    }, [isFavourite]);

    const handlePress = useCallback(() => {
        goToShared("TrackDetails", { id: id } as any);
    }, [id]);

    const handleToggleFavourite = useCallback((value: boolean) => {
        setIsFavouriteState(value);
    }, []);

    return (
        <Pressable
            style={[styles.container, { backgroundColor }]}
            onPress={handlePress}
        >
            <Text preset="bodyLargeBold" style={{ color: textColor }}>{label}</Text>

            <ToggleFavorite
                isFavourite={isFavouriteState}
                onToggle={handleToggleFavourite}
                trackId={id}
            />
        </Pressable>
    );
});

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        paddingHorizontal: wp(5),
        paddingVertical: hp(2),

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    }
})