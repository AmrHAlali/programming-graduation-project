import { useQueryClient } from "@tanstack/react-query";
import { useMutationWithAxios } from "../api";
import { createPostPayload } from "@/services/api/routes/posts-route";
import { showMessage } from "react-native-flash-message";
import { getFlashMessageStyle } from "@/providers";
import { SharedStackNavigationProp } from "@/screens/navigation/shared-stack-navigator";
import { useNavigation } from "@react-navigation/native";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<SharedStackNavigationProp>();

  const { mutateAsync, isPending, isSuccess } = useMutationWithAxios(
    "postRoute",
    "createPost",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["postRoute-getAllPosts"] });
        queryClient.invalidateQueries({ queryKey: ["postRoute-getUserPosts"] });
        navigation.goBack();
        showMessage({
          message: "Post created successfully!",
          ...getFlashMessageStyle().success,
        });
      },
    }
  );

  const createPost = async (payload: createPostPayload) => {
    await mutateAsync(payload);
  };

  return { createPost, isPending, isSuccess };
};
