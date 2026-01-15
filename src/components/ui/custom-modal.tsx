import {
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    Animated
} from "react-native";
import { ControlledInput, Input } from "./input";
import { FlatList } from "react-native-gesture-handler";
import { colors, getTypography, hp, rf, TxKeyPath, wp } from "@/core";
import { useEffect, useRef } from "react";

type ModalProps = {
    style?: object;
    isVisible: boolean;
    setIsVisible: (visible: boolean) => void;
    search: string;
    setSearch: (text: string) => void;
    data: any[];
    renderItem: ({ item, index }: { item: any, index: number }) => React.ReactElement;
    placeholderTx: TxKeyPath;
};

export const CustomModal: React.FC<ModalProps> = ({
    isVisible,
    setIsVisible,
    search,
    setSearch,
    data,
    renderItem,
    placeholderTx,
    ...props
}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(100)).current;

    useEffect(() => {
        if (isVisible) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 100,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [isVisible, fadeAnim, slideAnim]);

    const filteredData = data.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="none"
            onRequestClose={() => setIsVisible(false)}
            statusBarTranslucent
        >
            <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
                <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
                    <TouchableWithoutFeedback>
                        <Animated.View
                            style={[
                                styles.modalContent,
                                { transform: [{ translateY: slideAnim }] }
                            ]}
                        >
                            <Input
                                value={search}
                                textPreset="bodyLarge"
                                onChangeText={setSearch}
                                placeholderTx={placeholderTx}
                                placeholderTextColor={colors.primaryDeep}
                                addUnitStyle
                            />

                            <FlatList
                                data={filteredData}
                                renderItem={({ item, index }) => renderItem({ item, index })}
                                keyExtractor={(item, index) =>
                                    `item.value=${item.value}-${item.label}-${index}`
                                }
                                showsVerticalScrollIndicator={false}
                                keyboardShouldPersistTaps="handled"
                            />
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

// ✅ Dynamic font styles
const dynamicStyles = {
    itemText: () => ({
        color: colors.primaryDeep,
        fontFamily: getTypography().primary.medium,
        fontSize: rf(16),
    }),

    label: () => ({
        fontFamily: getTypography().primary.medium,
        fontSize: rf(18),
        marginBottom: hp(1.2),
        color: colors.neutrals.black,
    }),
};

// ✅ Static styles
const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.neutrals.backgroundOverlay,
    },

    modalContent: {
        width: wp(80),
        maxHeight: hp(50),
        backgroundColor: colors.neutrals.white,
        borderRadius: 12,
        padding: wp(4),
    },

    item: {
        paddingVertical: hp(2),
        borderBottomWidth: 1,
        borderBottomColor: colors.neutrals.gray400,
    },
});
