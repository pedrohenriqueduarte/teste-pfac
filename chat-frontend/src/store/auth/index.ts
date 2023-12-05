import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Token, User } from "../../services";

export type AuthState = {
  accessToken: Token | null;
  signed: boolean;
  user: User | null;
  setUserAuthenticated: (user: User, accessToken: Token) => void;
  signOut: () => void;
};

const useAuthStore = create(
  persist<AuthState>(
    (set) =>
      ({
        accessToken: null,
        signed: false,
        setUserAuthenticated: (user: User, accessToken: Token) =>
          set({
            signed: true,
            user,
            accessToken,
          }),
        signOut: () =>
          set({
            signed: false,
            user: null,
            accessToken: null,
          }),
      } as AuthState),
    {
      name: "useAuthStore",
    }
  )
);

export default useAuthStore;
