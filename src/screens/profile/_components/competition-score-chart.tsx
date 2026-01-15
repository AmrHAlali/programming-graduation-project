import { Text } from "@/components";
import { colors, Competition, getScreenDimensions, hp } from "@/core";
import React from "react";
import { ScrollView, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

export function CompetitionScoreChart({ competitions } : { competitions: Competition[] }) {
    const labels = competitions.map((comp) => comp.trackName.split(" ")[0]);
    const scores = competitions.map((comp) => comp.score);

    const chartWidth = Math.max(getScreenDimensions().width, labels.length * 80);

    if (competitions.length == 0) {
        return (null);
    }

    return (
        <View style={{ paddingTop: 20, gap: hp(1.5) }}>
            <Text
                tx="Competition Score Progress"
                preset="titleLargeBold"
            />

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <LineChart
                    data={{
                        labels,
                        datasets: [
                            {
                                data: scores,
                                strokeWidth: 2,
                            },
                        ],
                    }}
                    width={chartWidth}
                    height={260}
                    bezier
                    fromZero

                    withInnerLines={false}
                    withOuterLines={false}
                    withVerticalLines={false}
                    withHorizontalLines={false}

                    chartConfig={{
                        backgroundGradientFrom: colors.neutrals.white,
                        backgroundGradientTo: colors.neutrals.white,
                        decimalPlaces: 0,
                        color: () => colors.neutrals.black,
                        labelColor: () => colors.neutrals.gray700,
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 12,
                    }}
                />
            </ScrollView>
        </View >
    );
}