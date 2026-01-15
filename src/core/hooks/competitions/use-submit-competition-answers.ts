import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useMutationWithAxios } from "../api";
import { submitCompetitionAnswersPayload } from "@/services/api/routes/competition-route";
import { showMessage } from "react-native-flash-message";
import { getFlashMessageStyle } from "@/providers";

export const useSubmitCompetitionAnswers = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isSuccess } = useMutationWithAxios(
    "competitionRoute",
    "submitCompetitionAnswers",
    {
      onSuccess: () => {
        // Refresh competition details after submitting answers
        queryClient.invalidateQueries({
          queryKey: ["competitionRoute-getCompetitionById"],
        });
        showMessage({
          message: "Answers submitted successfully!",
          ...getFlashMessageStyle().success,
        });
      },
      onError: (error: AxiosError) => {
        if (error.response?.status === 403) {
          showMessage({
            message: "You have already submitted this competition.",
            ...getFlashMessageStyle().error,
          });
          return;
        }
      },
    }
  );

  const submitCompetitionAnswers = async (
    payload: submitCompetitionAnswersPayload
  ) => {
    return await mutateAsync(payload);
  };

  return { submitCompetitionAnswers, isPending, isSuccess };
}
