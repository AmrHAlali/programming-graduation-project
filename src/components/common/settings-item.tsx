import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, DropdownItem, Text } from "@/components";
import { Icon } from "@/components/ui/icon";
import { colors, hp, rf, TxKeyPath } from "@/core";
import { useTranslation } from "react-i18next";
import { BottomSheetSelect } from "./bottom-sheet-select";

type SettingsItemProps = {
  titleTx: TxKeyPath | string;
  modalPlaceholderTx: TxKeyPath | string;
  data: DropdownItem[];
  selectedValue?: string;
  onSelect: (item: DropdownItem) => void;
  error?: string | undefined;
  infoOnPress?: () => void;
  disabled?: boolean;
  whenDisabled?: () => void;
  multiple?: boolean;
  selectedValues?: string[];
};

export const SettingsItem = ({
  titleTx,
  modalPlaceholderTx,
  data,
  selectedValue,
  onSelect,
  error,
  infoOnPress,
  disabled,
  whenDisabled,
  multiple,
  selectedValues,
}: SettingsItemProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

  useEffect(() => {
    if (selectedValue) {
      const found = data.find((item) => item.value === selectedValue);
      setSelectedItem(found || null);
    } else {
      setSelectedItem(null);
    }
  }, [selectedValue, data]);

  const { t } = useTranslation();

  const selectedItemsForLabel = multiple && selectedValues && selectedValues.length
    ? data.filter((item) => selectedValues.includes(item.value))
    : selectedItem
      ? [selectedItem]
      : [];

  const displayLabel = selectedItemsForLabel.length
    ? multiple
      ? selectedItemsForLabel.map((item) => t(item.label as any)).join(", ")
      : t(selectedItemsForLabel[0].label as any)
    : t(titleTx ? (modalPlaceholderTx as any) : (modalPlaceholderTx as any));

  return (
    <View style={[styles.setting, disabled && { opacity: 0.6 }]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text preset="titleMedium" tx={titleTx} />
        {/* {infoOnPress && <Icon icon="info" size={wp(4)} onPress={infoOnPress} color={colors.primaryDeep} />} */}
      </View>
      <Button
        preset="primary"
        onPress={() => {
          if (disabled) {
            whenDisabled?.();
            return;
          }
          setModalVisible(true)
        }}
        style={[styles.button, error ? styles.buttonError : undefined]}
        pressedStyle={styles.pressedStyle}
        RightAccessory={() => <Icon icon="arrow" size={rf(12)} />}
      >
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}
        >
          <Text
            preset="bodyMedium"
            color={colors.neutrals.white}
            style={styles.settingLabel}
          >
            {displayLabel}
          </Text>
        </View>
      </Button>

      {/* Error message */}
      {error ? (
        <Text preset="bodySmall" style={styles.errorText} color={colors.states.error}>
          {error}
        </Text>
      ) : null}

      <BottomSheetSelect
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        data={data}
        search={search}
        setSearch={setSearch}
        multiple={multiple}
        selectedValues={multiple ? (selectedValues ?? []) : selectedItem?.value ? [selectedItem.value] : []}
        onSelect={(value: string) => {
          const found = data.find((d) => d.value === value);
          if (found) {
            setSelectedItem(found);
            onSelect(found);
          }
          if (!multiple) {
            setModalVisible(false);
          }
        }}
        placeholderTx={modalPlaceholderTx}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  setting: {
    gap: hp(1),
  },
  button: {
    backgroundColor: colors.neutrals.gray200,
  },
  pressedStyle: {
    backgroundColor: colors.neutrals.gray200,
    opacity: 0.5,
  },
  settingLabel: {
    flex: 1,
    color: colors.neutrals.gray700,
  },
  buttonError: {
    borderWidth: 1,
    borderColor: colors.states.error,
    backgroundColor: colors.neutrals.gray200,
  },
  errorText: {
    marginTop: hp(0.5),
  },
});
