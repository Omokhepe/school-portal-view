export function getLaravelError(err: any): string {
  const data = err.response?.data;
  console.log(data, err.message, err.response);

  if (!data) return "Network error";

  // validation errors exist
  if (data.error && typeof data.error === "object") {
    const first = Object.values(data.error)[0] as string[];
    return first[0]; // first validation message
  }

  return data.message || "Something went wrong";
}

// export const apiFetch = async (url: string, token: string) => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
//     // method: "GET",
//     headers: { Authorization: `Bearer ${token}` },
//     cache: "no-store",
//   });
//
//   const data = await res.json();
//   return data;
// };

// src/lib/apiFetch.ts
export async function apiFetch<T = any>(path: string, token: string | null) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(url, { headers, cache: "no-store" });

  const text = await res.text();
  try {
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
    return data as T;
  } catch (err) {
    // If JSON.parse fails, show raw text for debugging
    if (!res.ok) throw new Error(text || `HTTP ${res.status}`);
    // If parse failed but status ok, rethrow parse error
    throw err;
  }
}
