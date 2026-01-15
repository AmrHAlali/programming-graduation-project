import { useQueryClient } from "@tanstack/react-query";
import { useMutationWithAxios } from "../api";
import { loginPayload, registerPayload } from "@/services";
import { AuthStatusEnum } from "@/core/types";
import { useUserStore } from "@/core/store";
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavigationProp } from "@/screens";

export const useLogin = () => {
    const queryClient = useQueryClient();
    const navigation = useNavigation<AuthStackNavigationProp>();

    const { mutateAsync, isPending, isSuccess } = useMutationWithAxios(
        "authRoute",
        "login",
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

                // Update navigation and auth state
                navigation.replace("MainTabs" as any);
            },
        }
    );

    const login = async (payload: loginPayload) => {
        await mutateAsync(payload);
    };

    return { login, isPending, isSuccess };
};
