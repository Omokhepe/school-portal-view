"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ClassSub } from "../types/class";
import { createIndexedDBStorage } from "@store/indexedDBStorage";
import { SubjectType, UserType } from "../types/user";
import { DataKey } from "../types/auth";

type PersistedAppState = {
  classes: ClassSub;
  users: UserType[];
  students: UserType[];
  teachers: UserType[];
  subjects: SubjectType[];
  fetched: Record<DataKey, boolean>;
};

type AppState = PersistedAppState & {
  inFlight: Record<DataKey, boolean>;

  setData: <K extends DataKey>(key: K, data: AppState[K]) => void;
  startLoading: (key: DataKey) => void;
  finishLoading: (key: DataKey) => void;
  resetFetched: (key: DataKey) => void;
  clearAll: () => void;
};

const storage = createIndexedDBStorage<PersistedAppState>(
  "SchoolDB",
  "SchoolStore",
);

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      classes: {
        creche: [],
        primary: [],
        jss: [],
        sss: [],
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
            sss: [],
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
