import { ClassSub } from "../types/class";

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

// src/lib/apiFetch.ts
export async function apiFetch<T = any>(
  path: string,
  token: string | null,
  opts: RequestInit = {},
) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;
  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...(opts.headers || {}),
  };

  const res = await fetch(url, { ...opts, headers });

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
// export const groupClassesByLevel = (classes: ClassSub) => {
//   const allClasses = [
//     ...classes.creche,
//     ...classes.primary,
//     ...classes.jss,
//     ...classes.ss,
//   ];
//   return allClasses.reduce((acc, cls) => {
//     if (!acc[cls.level]) acc[cls.level] = [];
//     acc[cls.level].push(cls);
//     return acc;
//   }, {});
// };

// // Count students in a specific class
// export const getClassStudentCount = (students, classId) => {
//   return students.filter((s) => s.class_id === classId).length;
// };
//
// // Count students in an entire level (sum of all classes inside)
// export const getLevelStudentCount = (students, grouped, level) => {
//   const classIds = grouped[level].map((c) => c.id);
//   return students.filter((s) => classIds.includes(s.class_id)).length;
// };

export function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const day = d.getDate().toString().padStart(2, "0");
  const month = d.toLocaleString("en", { month: "short" });
  return `${day}/${month}`;
}

export function validateAndPreviewImage(
  file: File | null,
  onValid: (previewUrl: string, file: File) => void,
  onError?: (message: string) => void,
) {
  if (!file) return;

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    onError?.("Only images are allowed");
    return;
  }

  const previewUrl = URL.createObjectURL(file);
  onValid(previewUrl, file);
}
