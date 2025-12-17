// src/hooks/useData.ts
"use client";

import { useEffect } from "react";
import { loadResource } from "@actions/loader";
import useAppStore from "@store/appStore";
import { DataKey } from "../types/auth";

export function createResourceHook(key: DataKey) {
  return function useResource(token: string) {
    const data = useAppStore((s) => s[key]);
    const loading = useAppStore((s) => s.inFlight[key]);

    useEffect(() => {
      if (token) loadResource(key, token);
    }, [token]);

    return { data, loading };
  };
}

export async function refreshResources(
  keys: Array<"users" | "students" | "classes" | "teachers" | "subjects">,
  token: string,
) {
  const promises = keys.map((key) => loadResource(key, token, true));
  return Promise.all(promises);
}

export const useClasses = createResourceHook("classes");
export const useUsers = createResourceHook("users");
export const useStudents = createResourceHook("students");
export const useTeachers = createResourceHook("teachers");
export const useSubjects = createResourceHook("subjects");
