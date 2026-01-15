import { useQueryClient } from "@tanstack/react-query";
import { useMutationWithAxios } from "../api";
import { followUserPayload } from "@/services/api/routes/user-route";
import { showMessage } from "react-native-flash-message";
import { getFlashMessageStyle } from "@/providers";
import { useUserStore } from "@/core";

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  const username = useUserStore((state) => state.authDetails?.username);

  const { mutateAsync, isPending, isSuccess } = useMutationWithAxios(
    "userRoute",
    "followUser",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["userRoute-getUserProfile"] });
        queryClient.invalidateQueries({ queryKey: ["userRoute-getFollowing"] });
        showMessage({
          message: "Followed successfully",
          ...getFlashMessageStyle().success,
        });
      },
    }
  );

  const followUser = async (followUsername: string) => {
    await mutateAsync({ username: username!, followUsername });
  };

  return { followUser, isPending, isSuccess };
};
