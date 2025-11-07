import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  // token: string | null;
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  // must_change_password: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  // email_verified_at?: any;
  role: string;
  must_change_password: number;
  class_id: number;
  created_at: string;
  updated_at: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // token: null,
      user: null,

      setUser: (user) => set({ user }),

      logout: () => set({ user: null }),
    }),
    { name: "auth-storage" },
  ),
);
