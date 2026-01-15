import { colors, hp, TxKeyPath, wp } from "@/core";
import { StyleSheet, View } from "react-native";
import { Text } from "./text";
import { Pressable } from "react-native-gesture-handler";

type Props = {
    item: TxKeyPath;
    checked: boolean;
    onToggle: () => void;
};

export const CheckBox = ({ item, checked, onToggle }: Props) => {
    return (
        <Pressable
            key={`${item}-${checked}`}
            style={styles.container}
            onPress={onToggle}
        >
            <Text
                tx={item}
                preset={checked ? "titleMedium" : "titleMediumLight"}
                color={checked ? colors.primaryDeep : colors.neutrals.gray700}
            />

            <View
                style={[
                    styles.boxOuter,
                    checked && styles.boxOuterChecked,
                ]}
            >
                {checked && <View style={styles.checkMark} />}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: hp(1),
        zIndex: 900
    },

    boxOuter: {
        width: wp(6),
        height: wp(6),
        borderRadius: 4,
        borderWidth: 2,
        borderColor: colors.neutrals.gray700,
        justifyContent: "center",
        alignItems: "center",
    },

    boxOuterChecked: {
        borderColor: colors.primaryDeep,
    },

    checkMark: {
        width: wp(3.5),
        height: wp(3.5),
        backgroundColor: colors.primaryDeep,
        borderRadius: 2,
    },
});
