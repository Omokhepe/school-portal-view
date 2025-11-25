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

// Group classes by their level
export const groupClassesByLevel = (classes) => {
  const allClasses = [
    ...classes.creche,
    ...classes.primary,
    ...classes.secondary,
  ];
  return allClasses.reduce((acc, cls) => {
    if (!acc[cls.level]) acc[cls.level] = [];
    acc[cls.level].push(cls);
    return acc;
  }, {});
};

// Count students in a specific class
export const getClassStudentCount = (students, classId) => {
  return students.filter((s) => s.class_id === classId).length;
};

// Count students in an entire level (sum of all classes inside)
export const getLevelStudentCount = (students, grouped, level) => {
  const classIds = grouped[level].map((c) => c.id);
  return students.filter((s) => classIds.includes(s.class_id)).length;
};
