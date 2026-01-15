import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { hp, rf } from "@/core/utils";
import { colors, getTypography } from "@/core/theme";
import { Text } from "./text";
import { TxKeyPath } from "@/core";
import { ReadyModal } from "@/components/ui/ready-modal";

export interface DropdownItem {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  data: DropdownItem[];
  placeholder?: string;
  onSelect: (item: DropdownItem) => void;
  selectedValue?: string;
  label?: string;
  disabled?: boolean;
  ltrAlign?: boolean;
  modalPlaceholderTx: TxKeyPath;
  style?: object;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  data,
  placeholder = "Select an option",
  onSelect,
  selectedValue,
  label,
  disabled = false,
  ltrAlign = false,
  modalPlaceholderTx,
  style,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (selectedValue) {
      const found = data.find((item) => item.value === selectedValue);
      setSelectedItem(found || null);
    }
  }, [selectedValue, data]);

  const handleSelect = (value: string) => {
    const found = data.find((item) => item.value === value);
    if (found) {
      setSelectedItem(found);
      onSelect(found);
    }
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={dynamicStyles.label()}>{label}</Text>}

      <TouchableOpacity
        style={[
          styles.dropdownButton,
          disabled && styles.dropdownButtonDisabled,
          style,
        ]}
        onPress={() => !disabled && setIsVisible(true)}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
      >
        <Text
          preset="bodyMedium"
          style={[
            dynamicStyles.selectedText(),
            disabled && styles.selectedTextDisabled,
            ltrAlign && styles.ltrAlign,
          ]}
          numberOfLines={1}
        >
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
      </TouchableOpacity>

      <ReadyModal
        data={data}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        setSearch={setSearch}
        search={search}
        placeholderTx={modalPlaceholderTx}
        onSelect={handleSelect}
      />
    </View>
  );
};

// ✅ Dynamic styles using functions (so fonts update with getTypography)
const dynamicStyles = {
  selectedText: () => ({
    color: colors.neutrals.black,
    fontFamily: getTypography().primary.medium,
    fontSize: rf(20),
    textAlign: "center",
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
  container: {},

  dropdownButton: {
    height: hp(6),
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: colors.neutrals.transparent,
    width: "100%",
  },

  dropdownButtonDisabled: {
    opacity: 1,
  },

  selectedTextDisabled: {
    color: colors.neutrals.gray500,
  },

  ltrAlign: {
    direction: "ltr",
  },
});
