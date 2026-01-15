import { useQueryClient } from "@tanstack/react-query";
import { useMutationWithAxios } from "../api";
import { enrollInCompetitionPayload } from "@/services/api/routes/competition-route";
import { showMessage } from "react-native-flash-message";
import { getFlashMessageStyle } from "@/providers";

export const useEnrollInCompetition = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isSuccess } = useMutationWithAxios(
    "competitionRoute",
    "enrollInCompetition",
    {
      onSuccess: () => {
        // Invalidate related queries so UI reflects enrollment
        queryClient.invalidateQueries({ queryKey: ["competitionRoute-getCompetitionById"] });
        queryClient.invalidateQueries({ queryKey: ["userRoute-getCompetitionEnrolledUsers"] });
        showMessage({
          message: "Enrolled in competition successfully",
          ...getFlashMessageStyle().success,
        });
      },
    }
  );

  const enrollInCompetition = async (payload: enrollInCompetitionPayload) => {
    await mutateAsync(payload);
  };

  return { enrollInCompetition, isPending, isSuccess };
};
