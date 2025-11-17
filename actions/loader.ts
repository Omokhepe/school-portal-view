"use client";

import useSWR, { mutate as globalMutate } from "swr";
import { useAuthStore } from "@store/authStore";
import useAppStore from "@store/appStore";
import { API } from "@lib/endpoint";
import { apiFetch } from "@lib/helper";

/**
 * Hook for a single resource (client component)
 * returns data, loading (from store), mutate (SWR)
 */
export function useResource(key: keyof typeof API) {
  const token = useAuthStore((s) => s.token);
  const setData = useAppStore((s) => s.setData);
  const resourceUrl = token ? `${API[key]}` : null;

  const { data, error, mutate, isValidating } = useSWR(
    resourceUrl ? [resourceUrl, token] : null,
    (args: [string, string]) => apiFetch(args[0], args[1]),
    { dedupingInterval: 10000, revalidateOnFocus: true },
  );

  // sync SWR -> Zustand
  if (data) {
    // adapt shape: assume API returns either {items:[]} or [] or {classes:[]}
    const payload = Array.isArray(data)
      ? data
      : (data[key] ?? data.items ?? data.data ?? data);
    setData(key as any, payload);
  }

  const local = useAppStore((s) => s[key] as any[]);
  const loading = useAppStore((s) => s.inFlight[key]);

  return { data: local, error, mutate, isValidating: isValidating || loading };
}

/**
 * Programmatic loader used in non-hooks contexts or to force reloads.
 */
export async function loadResource(key: keyof typeof API, force = false) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) return null;

  const store = useAppStore.getState();
  if (store.fetched[key] && !force) return store[key];

  // mark in-flight
  store.startLoading(key as any);
  try {
    const url = `${API[key]}`;
    const data = await apiFetch(url, token);
    const payload = Array.isArray(data)
      ? data
      : (data[key] ?? data.items ?? data.data ?? data);
    useAppStore.getState().setData(key as any, payload);
    // update SWR cache too
    globalMutate(`${url}`, payload, false);
    return payload;
  } catch (err) {
    console.error("loadResource error", key, err);
    useAppStore.getState().finishLoading(key as any);
    throw err;
  }
}
