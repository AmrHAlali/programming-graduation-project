import { colors, hp, TxKeyPath, wp } from "@/core";
import { StyleSheet, View } from "react-native";
import { Text } from "./text";
import { Pressable } from "react-native-gesture-handler";

type Props = {
    item: TxKeyPath,
    selected: boolean,
    setSelected: () => void,
}
export const RadioButton = ({ item, selected, setSelected }: Props) => {
    return (
        <Pressable
            key={`${item}-${selected}`}
            style={styles.radioContainer}
            onPress={() => setSelected()}
        >
            <Text
                tx={item}
                preset={selected? "titleMedium" : "titleMediumLight"}
                color={selected ? colors.primaryDeep : colors.neutrals.gray700}
            />

            <View
                style={[
                    styles.radioOuter,
                    selected && styles.radioOuterSelected,
                ]}
            >
                {selected && <View style={styles.radioInner} />}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: hp(1),
        zIndex: 900
    },
    radioOuter: {
        width: wp(6),
        height: wp(6),
        borderRadius: 11,
        borderWidth: 2,
        borderColor: colors.neutrals.gray700,
        justifyContent: "center",
        alignItems: "center",
    },
    radioOuterSelected: {
        borderColor: colors.primaryDeep,
    },
    radioInner: {
        width: wp(3.5),
        height: wp(3.5),
        borderRadius: 6,
        backgroundColor: colors.primaryDeep,
    },
});