import { getScreenDimensions, } from "@/core";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
    StyleSheet,
    ImageBackground,
    View,
    ImageSourcePropType,
    FlatList,
    ViewToken,
    ListRenderItem,
} from "react-native";
import { OnboardingBox } from "./_components";
import { LanguageBottomSheet } from "@/components/common/language-bottom-sheet";
import { OnboardingData } from "@/core/constants/onboarding-data";
import { onboardingDataProps } from "@/core/types/onboarding-types";

const { width } = getScreenDimensions();

export function OnboardingScreen() {
    const [page, setPage] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handleSetPage = useCallback((idx: number) => {
        const clamped = Math.min(Math.max(idx, 0), OnboardingData.length - 1);
        setPage(clamped);
        flatListRef.current?.scrollToIndex({ index: clamped, animated: true });
    }, []);

    const onViewableItemsChanged = useRef(
        ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
            if (viewableItems?.length > 0 && viewableItems[0].index != null) {
                setPage(viewableItems[0].index!);
            }
        }
    ).current;

    const viewabilityConfig = useMemo(
        () => ({ viewAreaCoveragePercentThreshold: 50 }),
        []
    );

    const getItemLayout = useCallback(
        (_: any, index: number) => ({
            length: width,
            offset: width * index,
            index,
        }),
        []
    );

    const renderItem: ListRenderItem<onboardingDataProps> = useCallback(
        ({ item }) => {
            const source: ImageSourcePropType =
                typeof item.image === "string" ? { uri: item.image } : item.image;

            return (
                <View style={styles.slide}>
                    <ImageBackground
                        source={source}
                        style={styles.background}
                        resizeMode="cover"
                    />
                </View>
            );
        },
        []
    );

    return (
        <View style={styles.container}>
            <FlatList<onboardingDataProps>
                ref={flatListRef}
                data={OnboardingData}
                keyExtractor={(_, i) => String(i)}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                bounces={false}
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={0}
                getItemLayout={getItemLayout}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
            />

            <OnboardingBox
                length={OnboardingData.length}
                setPage={handleSetPage}
                activePage={page}
                page={OnboardingData[page]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    slide: {
        width,
        height: "80%",
    },
    background: { height: "100%", width: "100%" },
});