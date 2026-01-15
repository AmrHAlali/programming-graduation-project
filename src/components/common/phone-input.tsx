import { hp } from "@/core/utils";
import { ControlledInput } from "../ui/input";
import { CustomDropdown } from "../ui/custom-dropdown";
import { View } from "react-native";
import { countryCodes } from "@/core/constants/countries-data";
import { Text } from "../ui/text";
import { colors } from "@/core/theme";
import { TxKeyPath } from "@/core/i18n";
import { Icon } from "../ui/icon";

interface PhoneInputProps {
  control: any;
  setValue: any;
  errors: any;
  disabled?: boolean;
  selectedCountryCode?: string;
  labelTx?: TxKeyPath;
  phoneFieldName?: string;
  countryCodeFieldName?: string;
  keyboardType?: string;
  addUnitStyle?: boolean;
}

export function PhoneInput({
  control,
  setValue,
  errors,
  disabled,
  selectedCountryCode,
  labelTx = "auth.common.phone",
  phoneFieldName = "phone",
  countryCodeFieldName = "countryCode",
  addUnitStyle = false,
}: PhoneInputProps) {
  return (
    <View style={{ gap: hp(0.8) }}>
      <ControlledInput
        addUnitStyle={addUnitStyle}
        name={phoneFieldName}
        control={control}
        labelTx={labelTx}
        placeholder="00000000"
        keyboardType="phone-pad"
        showError={false}
        direction="ltr"
        disabled={disabled}
        leftAccessory={<Icon icon="phoneAndroid" />}
        rightAccessory={
          <CustomDropdown
            data={countryCodes}
            placeholder={countryCodes[185].label}
            onSelect={(item) => setValue(countryCodeFieldName, item.value)}
            selectedValue={selectedCountryCode}
            disabled={disabled}
            ltrAlign={true}
            modalPlaceholderTx="auth.common.find_country_code"
          />
        }
      />
      {errors?.[phoneFieldName]?.message && (
        <Text
          style={{ color: colors.states.error, marginBottom: hp(0.5) }}
          preset="bodySmall"
          tx={errors[phoneFieldName]?.message as TxKeyPath | undefined}
        />
      )}
    </View>
  );
}
