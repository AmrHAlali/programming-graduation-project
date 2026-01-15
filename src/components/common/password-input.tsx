import { hp } from "@/core/utils";
import { ControlledInput } from "../ui/input";
import { Image, View } from "react-native";
import { Text } from "../ui/text";
import { colors } from "@/core/theme";
import { TxKeyPath } from "@/core/i18n";
import { Button } from "../ui";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "../ui/icon";

export function PasswordInput({ control, isLogin, errors, name = "password", labelTx="auth.common.password" } : { control: any, isLogin?: boolean, errors: any, name?: string, labelTx?: string }) {
    const navigation = useNavigation();

    return (
        <View style={{ gap: hp(0.8) }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text preset="bodyLarge" tx={labelTx as TxKeyPath} style={{ color: errors ? colors.states.error : colors.neutrals.black }} />
                {isLogin && <Button
                    textStyle={{ color: colors.accent.beige }}
                    onPress={() => navigation.navigate("ForgotPassword" as never)}
                    preset="textButton"
                    textPreset="titleSmall"
                    tx="auth.common.forgetPassword"
                />}
            </View>

            <ControlledInput
                name={name}
                control={control}
                keyboardType="default"
                secureTextEntry
                showError={false}
                leftAccessory={<Icon icon="lock" />}
            />
            {errors?.message && <Text style={{ color: colors.states.error, marginBottom: hp(.5) }} preset="bodySmall" tx={errors?.message as TxKeyPath | undefined} />}
        </View>
    );
}