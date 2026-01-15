import { useQueryClient } from "@tanstack/react-query";
import { useMutationWithAxios } from "../api";
import { removeFavoriteTrackPayload } from "@/services/api/routes/track-route";
import { showMessage } from "react-native-flash-message";
import { getFlashMessageStyle } from "@/providers";

export const useRemoveFavoriteTrack = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isSuccess } = useMutationWithAxios(
    "trackRoute",
    "removeFavoriteTrack",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["trackRoute-getFavoriteTracks"] });
        queryClient.invalidateQueries({ queryKey: ["userRoute-getUserProfile"] });
        showMessage({
          message: "Track removed from favorites",
          ...getFlashMessageStyle().success,
        });
      },
    }
  );

  const removeFavoriteTrack = async (payload: removeFavoriteTrackPayload) => {
    await mutateAsync(payload);
  };

  return { removeFavoriteTrack, isPending, isSuccess };
};
