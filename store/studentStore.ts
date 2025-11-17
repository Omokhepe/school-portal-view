import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ClassRoot, ClassSub } from "../types/class";

// type ClassType = {
//   id: number;
//   name: string;
// };

type ClassStore = {
  classes: ClassSub[];
  setClasses: (data: ClassSub[]) => void;
};

export const useClassStore = create<ClassStore>()(
  persist(
    (set) => ({
      classes: [],
      setClasses: (data) => set({ classes: data }),
    }),
    { name: "class-store", storage: createJSONStorage(() => localStorage) },
  ),
);
