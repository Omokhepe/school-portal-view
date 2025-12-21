"use client";

import useSWR from "swr";
import { useAuthStore } from "@store/authStore";
import { apiFetch } from "@lib/helper";
import { TimetableEntry } from "../types/timetable";

export function useTimetable(classId?: number | null) {
  const token = useAuthStore((s) => s.token);
  const key =
    token && classId ? [`/timetable?class_id=${classId}`, token] : null;
  const { data, error, mutate } = useSWR<TimetableEntry[]>(
    key,
    async ([url, t]) => {
      return apiFetch(url, t);
    },
    { revalidateOnFocus: false },
  );

  const refresh = () => mutate();

  return { entries: data ?? [], error, refresh, mutate };
}

export function useTeacherTimetable() {
  const token = useAuthStore((s) => s.token);
  const key = token ? [`/timetable/teacher`, token] : null;
  const { data, error, mutate } = useSWR<TimetableEntry[]>(
    key,
    async ([url, t]) => {
      return apiFetch(url, t);
    },
    { revalidateOnFocus: false },
  );

  const refreshData = () => mutate();

  return { teacherEntries: data ?? [], error, refreshData, mutate };
}
