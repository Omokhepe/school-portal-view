"use client";

import useSWR from "swr";
import { useAuthStore } from "@store/authStore";
import { apiFetch } from "@lib/helper";
import { TimetableData } from "../types/timetable";

export function useTimetable(classId?: number | null) {
  const token = useAuthStore((s) => s.token);

  const key =
    token && classId ? [`/timetable?class_id=${classId}`, token] : null;

  const fetcher = async ([url, t]: [string, string]) => {
    const res = await apiFetch<TimetableData[]>(url, t);

    if (!Array.isArray(res)) {
      throw new Error("Invalid timetable response");
    }

    return res;
  };

  const { data, error, mutate, isLoading } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    entries: data ?? [],
    error,
    isLoading,
    refresh: mutate,
  };
}

export function useTeacherTimetable() {
  const token = useAuthStore((s) => s.token);

  const key = token ? [`/timetable/teacher`, token] : null;

  const { data, error, mutate } = useSWR<TimetableData[]>(
    key,
    async ([url, t]) => {
      const result = await apiFetch(url, t);
      return result ?? [];
    },
    { revalidateOnFocus: false },
  );

  return {
    teacherEntries: data ?? [],
    error,
    refreshTeacher: mutate,
  };
}
