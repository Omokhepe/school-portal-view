"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "../types/auth";

interface AuthState {
  token: string | null;
  user: User | null;
  login: (data: any) => void;
  logout: () => void;
  hydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
  // hasRole: (roles: string[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      hydrated: false,

      login: (data) => set({ token: data.token, user: data.user }),

      logout: () => set({ token: null, user: null }),
      setHydrated: (hydrated) => set({ hydrated }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);

export const authStore = useAuthStore;
