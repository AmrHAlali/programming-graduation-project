import React from "react";
import { useUserStore } from "@/core/store/features/user/use-user-store";
import { AuthNavigator } from "./auth-stack-navigator";

export const Protected = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useUserStore(s => s.isAuthenticated);

  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  return <>{children}</>;
};
