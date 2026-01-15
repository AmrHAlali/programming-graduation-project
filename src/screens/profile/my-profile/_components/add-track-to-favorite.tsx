import { Text } from "@/components";
import { colors } from "@/core";
import { goToShared } from "@/screens/navigation/shared-navigation";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Pressable } from "react-native-gesture-handler";

export const AddTrackToFavorite = () => {
    return (
        <Pressable
            style={styles.container}
            onPress={() => {
                goToShared("TracksList")
            }}
        >
            {/* <Icon icon="plus" /> */}
            <Text
                color={colors.primaryDark}
                preset="bodyMediumBold"
                style={{ textDecorationColor: colors.primaryDark, textDecorationLine: "underline" }}
            >
                Add Track to Favorites
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        justifyContent: "center",
    }
});