import React from "react";
import { UsersList } from "./index";
import { useGetFollowing } from "@/core/hooks/user/use-following";

type FollowingListRoute = {
  params: {
    username: string;
    title?: string;
  };
};

export const FollowingListScreen = ({ route }: { route: FollowingListRoute }) => {
  const { username, title } = route.params;
  const { users, isLoading } = useGetFollowing({ username });

  return (
    <UsersList
      title={title ?? "Following Screen"}
      users={users}
      isLoading={isLoading}
    />
  );
};
