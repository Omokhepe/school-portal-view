"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "../types/auth";
import useAppStore from "@store/appStore";

interface AuthState {
  token: string;
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
      token: "",
      user: null,
      hydrated: false,

      login: (data) => set({ token: data.token, user: data.user }),

      logout: () => {
        useAppStore.getState().clearAll();
        set({ token: "", user: null });
      },
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
