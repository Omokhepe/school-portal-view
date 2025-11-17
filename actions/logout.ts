import { useAuthStore } from "@store/authStore";
import useAppStore from "@store/appStore";
import { useRouter } from "next/navigation";
import { mutate as globalMutate } from "swr";

export function useLogout() {
  const clearAuth = useAuthStore((s) => s.logout);
  const clearApp = useAppStore((s) => s.clearAll);
  const router = useRouter();

  return () => {
    clearAuth();
    clearApp();
    // clear SWR cache
    globalMutate(() => true, undefined, { revalidate: false });
    // remove any leftover cookies etc
    router.push("/login");
  };
}
