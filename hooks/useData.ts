// src/hooks/useData.ts
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@store/authStore";
import { loadResource, useResource } from "@actions/loader";
import useAppStore from "@store/appStore";
import {
  fetchedClasses,
  fetchedStudents,
  fetchedSubjects,
  fetchedTeachers,
  fetchedUsers,
} from "@actions/teacherNotes";

/**useClasses hook */
// export function useClasses() {
//   const token = useAuthStore((s) => s.token);
//   const classes = useResource("classes");
//   useEffect(() => {
//     if (!token) return;
//     // trigger loader (will no-op if already fetched)
//     loadResource("classes").catch(() => {});
//   }, [token]);
//   return classes;
// }
//
// /** useStudents hook */
// export function useStudents() {
//   const token = useAuthStore((s) => s.token);
//   const students = useResource("students");
//   useEffect(() => {
//     if (!token) return;
//     loadResource("students").catch(() => {});
//   }, [token]);
//   return students;
// }
//
// /** useUsers, useTeachers, useSubjects — same pattern */
// export const useTeachers = () => {
//   const token = useAuthStore((s) => s.token);
//   const data = useResource("teachers");
//   useEffect(() => {
//     if (token) loadResource("teachers").catch(() => {});
//   }, [token]);
//   return data;
// };
// export const useSubjects = () => {
//   const token = useAuthStore((s) => s.token);
//   const data = useResource("subjects");
//   useEffect(() => {
//     if (token) loadResource("subjects").catch(() => {});
//   }, [token]);
//   return data;
// };
// export const useUsers = () => {
//   const token = useAuthStore((s) => s.token);
//   const data = useResource("users");
//   useEffect(() => {
//     if (token) loadResource("users").catch(() => {});
//   }, [token]);
//   return data;
// };

export function useClasses(token: string | null) {
  const classes = useAppStore((s) => s.classes);
  const inFlight = useAppStore((s) => s.inFlight.classes);
  useEffect(() => {
    if (token) fetchedClasses(token);
  }, [token]);
  return { classes, loading: inFlight };
}

export function useSubjects(token: string | null) {
  const subjects = useAppStore((s) => s.subjects);
  const inFlight = useAppStore((s) => s.inFlight.subjects);
  useEffect(() => {
    if (token) fetchedSubjects(token);
  }, [token]);
  return { subjects, loading: inFlight };
}

export function useStudents(token: string | null) {
  const students = useAppStore((s) => s.students);
  const inFlight = useAppStore((s) => s.inFlight.students);
  useEffect(() => {
    if (token) fetchedStudents(token);
  }, [token]);
  return { students, loading: inFlight };
}

export function useTeachers(token: string | null) {
  const teachers = useAppStore((s) => s.teachers);
  const inFlight = useAppStore((s) => s.inFlight.teachers);
  useEffect(() => {
    if (token) fetchedTeachers(token);
  }, [token]);
  return { teachers, loading: inFlight };
}

export function useUsers(token: string | null) {
  const users = useAppStore((s) => s.users);
  console.log("check 1.0 users", users);
  const inFlight = useAppStore((s) => s.inFlight.users);
  console.log("check 2.0 users", inFlight);
  useEffect(() => {
    if (token) fetchedUsers(token);
  }, [token]);
  return { users, loading: inFlight };
}
