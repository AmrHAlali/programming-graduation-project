import { StyleSheet } from "react-native";
import { Button, CustomModal, DropdownItem } from "@/components";
import { colors, hp, TxKeyPath, wp } from "@/core";
import { colorWithOpacity } from "@/core/utils/color-with-opacity";
import { FilterOption } from "@/core/helpers/filter";

type CustomSelectModalProps = {
  data: DropdownItem[] | FilterOption[];
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  search: string;
  setSearch: (text: string) => void;
  placeholderTx: TxKeyPath;
  onSelect: (value: string) => void;
  closeAfterSelect?: boolean;
};

export const ReadyModal = ({
  data,
  isVisible,
  setIsVisible,
  search,
  setSearch,
  placeholderTx,
  onSelect,
  closeAfterSelect = true,
}: CustomSelectModalProps) => {
  return (
    <CustomModal
      data={data}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      setSearch={setSearch}
      search={search}
      placeholderTx={placeholderTx}
      renderItem={({ item, index }) => (
        <Button
          preset="textButton"
          textPreset="bodyLarge"
          pressedTextStyle={{ color: colors.primaryDeep, opacity: 0.5 }}
          textStyle={styles.modalText}
          style={[
            { paddingVertical: hp(1), paddingHorizontal: wp(2) },
            index !== data.length - 1 && styles.modalItem,
          ]}
          tx={item.label}
          onPress={() => {
            onSelect(item.value);
            setSearch("");
            closeAfterSelect && setIsVisible(false);
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  modalText: {
    color: colors.primaryDeep,
    marginVertical: hp(1.5),
  },
  modalItem: {
    borderBottomWidth: 1,
    borderBottomColor: colorWithOpacity(colors.primaryDeep, 0.5),
  },
});
