import { Button, ControlledInput, Text } from "@/components";
import { colors, getRegisterSchema, hp, wp } from "@/core";
import { AuthStackNavigationProp } from "@/screens/navigation";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/core/hooks/auth/use-register";

type FormType = z.infer<ReturnType<typeof getRegisterSchema>>;

export const RegisterScreen = () => {
    const navigation = useNavigation<AuthStackNavigationProp>();
    const { register, isPending, isSuccess } = useRegister();

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        clearErrors,
        formState: { errors },
    } = useForm<FormType>({
        resolver: zodResolver(getRegisterSchema()),
        defaultValues: {
            name: "",
            username: "",
            password: "",
            email: "",
            bio: "",
        },
    });

    const onSubmit = (values: FormType) => {
        register(values);
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
                        Register a new account
                    </Text>

                    <ControlledInput
                        name="name"
                        placeholder="Name"
                        control={control}
                        addUnitStyle
                    />

                    <ControlledInput
                        name="username"
                        placeholder="Username"
                        control={control}
                        addUnitStyle
                    />

                    <ControlledInput
                        name="email"
                        placeholder="Email"
                        control={control}
                        keyboardType="email-address"
                        addUnitStyle
                    />

                    <ControlledInput
                        name="password"
                        placeholder="Password"
                        control={control}
                        secureTextEntry
                        addUnitStyle
                    />

                    <ControlledInput
                        name="bio"
                        placeholder="Bio"
                        control={control}
                        multiline
                        addUnitStyle
                    />

                    <View style={{ gap: hp(.5) }}>
                        <Button
                            text="Register"
                            onPress={handleSubmit(onSubmit)}
                            style={{ marginTop: hp(2) }}
                        />

                        <Pressable
                            onPress={() => {
                                navigation.replace('Login');
                            }}
                        >
                            <Text
                                preset="bodyMediumBold"
                                style={{ textDecorationColor: colors.neutrals.gray500, textDecorationLine: "underline" }}
                            >
                                Already have an account?
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