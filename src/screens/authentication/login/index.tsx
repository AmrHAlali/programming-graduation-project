import { Button, ControlledInput, Text } from "@/components";
import { AuthStatusEnum, colors, getLoginSchema, hp, useUserStore, wp } from "@/core";
import { AuthStackNavigationProp } from "@/screens/navigation";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/core/hooks/auth/use-login";

type FormType = z.infer<ReturnType<typeof getLoginSchema>>;

export const LoginScreen = () => {
    const navigation = useNavigation<AuthStackNavigationProp>();
    const { login, isPending, isSuccess } = useLogin();

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        clearErrors,
        formState: { errors },
    } = useForm<FormType>({
        resolver: zodResolver(getLoginSchema()),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = (values: FormType) => {
        login(values);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.content}>
                    <Text
                        preset="headingSmallBold"
                        style={{ marginBottom: hp(2) }}
                    >
                        Login to your account
                    </Text>

                    <ControlledInput
                        name="username"
                        placeholder="Username"
                        control={control}
                        addUnitStyle
                    />

                    <ControlledInput
                        name="password"
                        placeholder="Password"
                        control={control}
                        secureTextEntry
                        addUnitStyle
                    />

                    <View style={{ gap: hp(.5) }}>
                        <Button
                            text="Login"
                            onPress={handleSubmit(onSubmit)}
                            style={{ marginTop: hp(2) }}
                        />

                        <Pressable
                            onPress={() => {
                                navigation.navigate('Register');
                            }}
                        >
                            <Text
                                preset="bodyMediumBold"
                                style={{ textDecorationColor: colors.neutrals.gray500, textDecorationLine: "underline" }}
                            >
                                Don't have an account?
                            </Text>
                        </Pressable>
                    </View>
                    </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: hp(8),
        paddingHorizontal: wp(5),
        paddingBottom: hp(10),
        backgroundColor: colors.background,
        flexGrow: 1,
    },
    content: {
        gap: hp(1.5),
    }
})