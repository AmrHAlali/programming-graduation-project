import { Text } from "@/components";
import { hp, TxKeyPath } from "@/core";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export const StatisticsField = ({ value, label, onPress } : { value: number, label: TxKeyPath|string, onPress?: () => void }) => {
    return (
        <TouchableOpacity activeOpacity={.4} style={styles.field} onPress={onPress}>
            <Text preset="titleLargeBold">{value}</Text>
            <Text preset="titleMedium" tx={label} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    field: {
        gap: hp(.25),
        alignItems: "center"
    }
});