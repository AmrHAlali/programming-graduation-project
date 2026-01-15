import { useQueryWithAxios } from "../api";
import { useUserStore } from "@/core";

export const useGetUserProfile = (userId?: string) => {
    const fallbackUserId = useUserStore((state) => state.authDetails?.username);
    const resolvedUserId = userId ?? fallbackUserId ?? "";

    const queryResult = useQueryWithAxios(
        "userRoute",
        "getUserProfile",
        { userId: resolvedUserId },
        { enabled: !!resolvedUserId },
    );

    return {
        ...queryResult,
        // unwrap the GenericResponse payload for easier consumption in UI
        userProfile: queryResult.data,
    };
};
