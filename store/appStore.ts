// src/store/useAppStore.ts
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ClassSub } from "../types/class";

// export type ClassType = { id: number; name: string; [k: string]: any };

type DataKey = "classes" | "subjects" | "students" | "teachers" | "users";

export type UserType = {
  id: number;
  name: string;
  class_id?: number | null;
  role?: string;
  [k: string]: any;
};

// type InFlight = {
//   classes: boolean;
//   subjects: boolean;
//   students: boolean;
//   teachers: boolean;
//   users: boolean;
// };

type AppState = {
  // startLoading(arg0: string): unknown;
  classes: ClassSub[];
  subjects: any[];
  students: UserType[];
  teachers: UserType[];
  users: UserType[];

  // fetchedClasses: boolean;
  // fetchedSubjects: boolean;
  // fetchedStudents: boolean;
  // fetchedTeachers: boolean;
  // fetchedUsers: boolean;

  // inFlight: InFlight;
  inFlight: Record<DataKey, boolean>;
  fetched: Record<DataKey, boolean>;
  // setters
  // setClasses: (payload: ClassSub[]) => void;
  // setSubjects: (payload: any[]) => void;
  // setStudents: (payload: UserType[]) => void;
  // setTeachers: (payload: UserType[]) => void;
  // setUsers: (payload: UserType[]) => void;
  //

  setData: <K extends DataKey>(key: K, data: AppState[K]) => void;
  // setData: (key: DataKey, data: any[]) => void;
  startLoading: (key: DataKey) => void;
  finishLoading: (key: DataKey) => void;
  resetFetched: (key: DataKey) => void;
  clearAll: () => void;
  // startLoading: (key: keyof InFlight) => void;
  // finishLoading: (key: keyof InFlight) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      classes: [],
      subjects: [],
      students: [],
      teachers: [],
      users: [],

      // fetchedClasses: false,
      // fetchedSubjects: false,
      // fetchedStudents: false,
      // fetchedTeachers: false,
      // fetchedUsers: false,
      //
      // inFlight: {
      //   classes: false,
      //   subjects: false,
      //   students: false,
      //   teachers: false,
      //   users: false,
      // },

      inFlight: {
        classes: false,
        subjects: false,
        students: false,
        teachers: false,
        users: false,
      },
      fetched: {
        classes: false,
        subjects: false,
        students: false,
        teachers: false,
        users: false,
      },

      setData: (key, data) =>
        set((s) => ({
          ...s,
          [key]: data,
          // [`fetched${key[0].toUpperCase() + key.slice(1)}`]: true,
          fetched: { ...s.fetched, [key]: true },
          inFlight: { ...s.inFlight, [key]: false },
        })),

      startLoading: (key) =>
        set((s) => ({
          ...s,
          inFlight: { ...s.inFlight, [key]: true },
        })),
      finishLoading: (key) =>
        set((s) => ({
          ...s,
          inFlight: { ...s.inFlight, [key]: false },
        })),

      resetFetched: (key) =>
        set((s) => ({
          ...s,
          fetched: { ...s.fetched, [key]: true },
        })),
      clearAll: () =>
        set(() => ({
          classes: [],
          subjects: [],
          students: [],
          teachers: [],
          users: [],
          inFlight: {
            classes: false,
            subjects: false,
            students: false,
            teachers: false,
            users: false,
          },
          fetched: {
            classes: false,
            subjects: false,
            students: false,
            teachers: false,
            users: false,
          },
        })),
    }),
    {
      name: "app-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

// export const useAppStore = appStore;
export default useAppStore;
