"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ClassSub } from "../types/class";
import { createIndexedDBStorage } from "@store/indexedDBStorage";

type DataKey = "classes" | "subjects" | "students" | "teachers" | "users";

export type UserType = {
  id: number;
  name: string;
  class_id?: number | null;
  role?: string;
  [k: string]: any;
};

type AppState = {
  classes: ClassSub;
  subjects: any[];
  students: UserType[];
  teachers: UserType[];
  users: UserType[];

  inFlight: Record<DataKey, boolean>;
  fetched: Record<DataKey, boolean>;

  setData: <K extends DataKey>(key: K, data: AppState[K]) => void;
  startLoading: (key: DataKey) => void;
  finishLoading: (key: DataKey) => void;
  resetFetched: (key: DataKey) => void;
  clearAll: () => void;
};

const storage = createIndexedDBStorage<AppState>("SchoolDB", "SchoolStore");

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      classes: {
        creche: [],
        primary: [],
        jss: [],
        ss: [],
      },

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

      setData: (key, data) =>
        set((s) => ({
          ...s,
          [key]: data,
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
          classes: {
            creche: [],
            primary: [],
            jss: [],
            ss: [],
          },

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
      name: "school-cache",
      storage,
      version: 1,
      partialize: (state) => ({
        classes: state.classes,
        users: state.users,
        students: state.students,
        teachers: state.teachers,
        subjects: state.subjects,
        fetched: state.fetched,
      }),
    },
  ),
);

export default useAppStore;
