import { useAuthStore } from "@store/authStore";

export function useHasRole(allowedRoles: string[]): boolean {
  const user = useAuthStore((state) => state.user);
  if (!user) return false;
  return allowedRoles.includes(user.role);
}
