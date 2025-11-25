import { useAppStore } from "@store/appStore";
import { apiFetch } from "@lib/helper";

export async function loadResource(
  key: "classes" | "subjects" | "students" | "teachers" | "users",
  token: string,
  force = false,
) {
  const store = useAppStore.getState();

  if (store.fetched[key] && !force) {
    return store[key];
  }

  if (store.inFlight[key]) return;

  store.startLoading(key);

  try {
    const response = await apiFetch(`/${key}`, token);

    const data = Array.isArray(response)
      ? response
      : (response[key] ?? response.data ?? []);

    store.setData(key, data);
    return data;
  } catch (err) {
    store.finishLoading(key);
    throw err;
  }
}
