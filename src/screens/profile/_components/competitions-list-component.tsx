import { Button, Text } from "@/components";
import { colors, hp, Competition, $styles } from "@/core";
import { StyleSheet, View } from "react-native";
import { CompetitionComponent } from "@/components/common/competition-component";
import { goToShared } from "@/screens/navigation/shared-navigation";

export const CompetitionsListComponent = ({ competitions, showFullList }: { competitions: Competition[]; showFullList?: boolean }) => {
    if (competitions.length == 0) {
        return (null);
    }

    const filteredCompetitions = showFullList ? competitions : competitions.slice(0, 2);

    return (
        <View style={styles.container}>
            <Text
                tx="Completed Competitions"
                preset="titleLargeBold"
            />

            <View style={styles.competitionsContainer}>
                {filteredCompetitions.map((competition, index) => (
                    <View key={index}>
                        <CompetitionComponent competition={competition} />
                        <View style={{ height: hp(1.5) }} />
                    </View>
                ))}

                {competitions.length > filteredCompetitions.length && <Button
                    key="see-more"
                    style={{ backgroundColor: colors.primaryDeep, ...$styles.defaultShadow }}
                    tx="See More"
                    textPreset="bodyLargeBold"
                    onPress={() => goToShared("CompetitionsList", { competitions: competitions })}
                />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: hp(1.5)
    },
    competitionsContainer: {
        // gap: hp(1)
    }
});