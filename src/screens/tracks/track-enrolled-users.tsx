import React from "react";
import { UsersList } from "@/screens/profile/users-list";
import { useGetTrackEnrolledUsers } from "@/core/hooks/user/use-track-enrolled-users";
import type { RouteProp } from "@react-navigation/native";
import type { SharedStackParamList } from "@/screens/navigation/shared-stack-navigator";

type TrackEnrolledUsersRoute = RouteProp<SharedStackParamList, "TrackEnrolledUsers">;

export const TrackEnrolledUsersScreen = ({ route }: { route: TrackEnrolledUsersRoute }) => {
  const { trackId, title } = route.params;
  const { users, isLoading } = useGetTrackEnrolledUsers({ trackId});

  return (
    <UsersList
      title={title ?? "Enrolled Users"}
      users={users as any[]}
      isLoading={isLoading}
    />
  );
};
