import React, { useRef } from "react";
import ActionSheet, { ActionSheetRef, ScrollView } from "react-native-actions-sheet";
import { View, StyleSheet, TextInput, Dimensions } from "react-native";
import { Text } from "@/components";
import { colors, hp, wp, TxKeyPath, getTypography } from "@/core";
import i18n from "@/core/i18n";
import { colorWithOpacity } from "@/core/utils/color-with-opacity";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable } from "react-native-gesture-handler";
import { Icon } from "@/components";

type BottomSheetSelectProps = {
  data: { label: string | TxKeyPath; value: string }[];
  isVisible: boolean;
  setIsVisible: (v: boolean) => void;
  search: string;
  setSearch: (text: string) => void;
  placeholder?: string;
  placeholderTx?: TxKeyPath | string;
  onSelect: (value: string) => void;
  multiple?: boolean;
  selectedValues?: string[];
  ref?: React.RefObject<ActionSheetRef | null>;
};

export const BottomSheetSelect = React.forwardRef<ActionSheetRef, Omit<BottomSheetSelectProps, 'ref'>>((
  {
    data,
    isVisible,
    setIsVisible,
    search,
    setSearch,
    placeholder,
    placeholderTx,
    onSelect,
    multiple,
    selectedValues = [],
  },
  ref
) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const insets = useSafeAreaInsets();
  const { height } = Dimensions.get("window");
  const maxHeight = height * 0.7; // Limit to 70% of screen height

  React.useImperativeHandle(ref, () => actionSheetRef.current as ActionSheetRef);

  const filtered = data.filter((i) => {
    // Check if label is Translatable or string
    const labelText = i18n.t(i.label as any) || i.label;
    return labelText.toLowerCase().includes(search.toLowerCase());
  });

  React.useEffect(() => {
    if (isVisible) actionSheetRef.current?.show();
    else actionSheetRef.current?.hide();
  }, [isVisible]);

  const placeHolderText = placeholderTx ? i18n.t(placeholderTx) : placeholder;

  return (
    <ActionSheet
      ref={actionSheetRef}
      onClose={() => setIsVisible(false)}
      gestureEnabled={true}
      containerStyle={{ maxHeight }}
    >
      <ScrollView style={[styles.container, { marginBottom: insets.bottom }]} nestedScrollEnabled={true}>
        <TextInput
          placeholder={placeHolderText}
          placeholderTextColor={colorWithOpacity(colors.primaryDeep, 0.4)}
          value={search}
          onChangeText={setSearch}
          style={styles.search}
        />

        {filtered.map((item, index) => (
          <View key={index}>
            <Pressable
              style={styles.item}
              onPress={() => {
                onSelect(item.value);
                setSearch("");
                if (!multiple) {
                  setIsVisible(false);
                }
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  preset={selectedValues.includes(item.value) ? "bodyLargeBold" : "bodyLarge"}
                  style={[
                    styles.itemText,
                    selectedValues.includes(item.value) && {
                      color: colors.primary,
                    },
                  ]}
                >
                  {i18n.t(item.label as any)}
                </Text>

                {selectedValues.includes(item.value) && (
                  <Icon icon="check" size={wp(5)} color={colors.primaryDeep} />
                )}
              </View>
            </Pressable>

            {index !== filtered.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </ScrollView>
    </ActionSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
  },
  search: {
    width: "100%",
    paddingVertical: hp(1.3),
    paddingHorizontal: wp(3),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colorWithOpacity(colors.primaryDeep, 0.3),
    color: colors.primaryDeep,
    marginBottom: hp(2),
    fontFamily: getTypography().primary.light,
  },
  itemText: {
    color: colors.primaryDeep,
    marginVertical: hp(1.5),
  },
  item: {
    paddingVertical: hp(0.5),
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colorWithOpacity(colors.primaryDeep, 0.5),
  },
});
