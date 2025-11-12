"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "../types/auth";

interface AuthState {
  token: string | null;
  user: User | null;
  login: (data: any) => void;
  logout: () => void;
  // hasRole: (roles: string[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,

      login: (data) => set({ token: data.token, user: data.user }),

      logout: () => set({ token: null, user: null }),
    }),
    { name: "auth-store", storage: createJSONStorage(() => localStorage) },
  ),
);
