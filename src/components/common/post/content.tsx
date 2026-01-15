import { Text } from "@/components/ui";
import { colors } from "@/core";
import { StyleSheet, View } from "react-native";

export const Postcontent = ({ text }: { text: string }) => {
    return (
        <View>
            <Text preset="bodyMedium" color={colors.neutrals.black}>
                {text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
});