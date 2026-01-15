import { useQueryClient } from "@tanstack/react-query";
import { useMutationWithAxios } from "../api";
import { addFavoriteTrackPayload } from "@/services/api/routes/track-route";
import { showMessage } from "react-native-flash-message";
import { getFlashMessageStyle } from "@/providers";

export const useAddFavoriteTrack = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isSuccess } = useMutationWithAxios(
    "trackRoute",
    "addFavoriteTrack",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["trackRoute-getFavoriteTracks"] });
        queryClient.invalidateQueries({ queryKey: ["userRoute-getUserProfile"] });
        showMessage({
          message: "Track added to favorites",
          ...getFlashMessageStyle().success,
        });
      },
    }
  );

  const addFavoriteTrack = async (payload: addFavoriteTrackPayload) => {
    await mutateAsync(payload);
  };

  return { addFavoriteTrack, isPending, isSuccess };
};
