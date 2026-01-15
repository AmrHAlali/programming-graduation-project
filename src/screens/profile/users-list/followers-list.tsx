import React from "react";
import { UsersList } from "./index";
import { useGetFollowers } from "@/core/hooks/user/use-followers";

type FollowersListRoute = {
  params: {
    username: string;
    title?: string;
  };
};

export const FollowersListScreen = ({ route }: { route: FollowersListRoute }) => {
  const { username, title } = route.params;
  const { users, isLoading } = useGetFollowers({ username });

  return (
    <UsersList
      title={title ?? "Followers Screen"}
      users={users}
      isLoading={isLoading}
    />
  );
};
