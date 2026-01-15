import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStatusEnum, IAuthDetails, IUserDetails } from '@/core/types/user';

interface UserState {
  userDetails: IUserDetails | null;
  authDetails: IAuthDetails | null;
  authStatus: AuthStatusEnum;
  isFirstTime: boolean;
  isAuthenticated: boolean;

  removeUserCredential: () => void;
  setUserDetails: (details: IUserDetails | null) => void;
  setAuthDetails: (details: IAuthDetails | null) => void;
  setAuthStatus: (status: AuthStatusEnum) => void;
  setIsFirstTime: (value: boolean) => void;
  setIsAuthenticated: (value: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userDetails: {} as IUserDetails,
      authStatus: AuthStatusEnum.UNAUTHORIZED,
      isFirstTime: true,
      isAuthenticated: false,
      authDetails: {} as IAuthDetails,

      removeUserCredential: () =>
        set({
          userDetails: {} as IUserDetails,
          authDetails: {} as IAuthDetails,
          authStatus: AuthStatusEnum.UNAUTHORIZED,
          isAuthenticated: false,
        }),

      setUserDetails: (details) => set({ userDetails: details }),
      setAuthStatus: (status) => set({ authStatus: status }),
      setIsFirstTime: (value) => set({ isFirstTime: value }),
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      setAuthDetails: (details) => set({ authDetails: details }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
