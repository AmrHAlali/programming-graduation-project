import React from "react";
import { UsersList } from "@/screens/profile/users-list";
import { useGetCompetitionEnrolledUsers } from "@/core/hooks/user/use-competition-enrolled-users";
import type { RouteProp } from "@react-navigation/native";
import type { SharedStackParamList } from "@/screens/navigation/shared-stack-navigator";

type CompetitionEnrolledUsersRoute = RouteProp<SharedStackParamList, "CompetitionEnrolledUsers">;

export const CompetitionEnrolledUsersScreen = ({ route }: { route: CompetitionEnrolledUsersRoute }) => {
  const { competitionId, title } = route.params;
  const { users, isLoading } = useGetCompetitionEnrolledUsers({ competitionId });

  return (
    <UsersList
      title={title ?? "Enrolled Users"}
      users={users as any[]}
      isLoading={isLoading}
    />
  );
};
