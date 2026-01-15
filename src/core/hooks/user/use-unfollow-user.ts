import { useQueryClient } from "@tanstack/react-query";
import { useMutationWithAxios } from "../api";
import { unFollowUserPayload } from "@/services/api/routes/user-route";
import { showMessage } from "react-native-flash-message";
import { getFlashMessageStyle } from "@/providers";
import { useUserStore } from "@/core/store";

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();
  const username = useUserStore((state) => state.authDetails?.username);


  const { mutateAsync, isPending, isSuccess } = useMutationWithAxios(
    "userRoute",
    "unFollowUser",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["userRoute-getUserProfile"] });
        queryClient.invalidateQueries({ queryKey: ["userRoute-getFollowing"] });
        showMessage({
          message: "Unfollowed successfully",
          ...getFlashMessageStyle().success,
        });
      },
    }
  );

  const unfollowUser = async (followUsername: string) => {
    await mutateAsync({ username: username!, followUsername });
  };

  return { unfollowUser, isPending, isSuccess };
};
