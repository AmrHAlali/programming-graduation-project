import { useQueryClient } from "@tanstack/react-query";
import { useMutationWithAxios } from "../api";
import { registerPayload } from "@/services";
import { AuthStatusEnum } from "@/core/types";
import { useUserStore } from "@/core/store";
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavigationProp } from "@/screens";
import { showMessage } from "react-native-flash-message";
import { getFlashMessageStyle } from "@/providers";

export const useRegister = () => {
    const queryClient = useQueryClient();
    const navigation = useNavigation<AuthStackNavigationProp>();

    const { mutateAsync, isPending, isSuccess } = useMutationWithAxios(
        "authRoute",
        "register",
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries({ queryKey: ["userRoute-getUserProfile"] });

                useUserStore.getState().setAuthStatus(AuthStatusEnum.AUTHORIZED);
                useUserStore.getState().setIsAuthenticated(true);

                // Persist auth details (token + username)
                useUserStore.getState().setAuthDetails({
                    token: data.accessToken,
                    username: variables.username,
                });

                // Optionally persist basic user details from the form
                useUserStore.getState().setUserDetails({
                    token: data.accessToken,
                    name: variables.name,
                    email: variables.email,
                    username: variables.username,
                    bio: variables.bio ?? "",
                });
                // Update navigation and auth state
                navigation.replace("MainTabs" as any);
            },
            onError: (error: any) => {
                // Try to extract a backend error message if available
                const backendMessage =
                    error?.response?.data?.message ||
                    error?.response?.data?.error ||
                    error?.message;

                showMessage({
                    message: backendMessage || "Registration failed",
                    ...getFlashMessageStyle().error,
                });
            },
        }
    );

    const register = async (payload: registerPayload) => {
        await mutateAsync(payload);
    };

    return { register, isPending, isSuccess };
};
