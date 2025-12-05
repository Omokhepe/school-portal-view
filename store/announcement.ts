import { create } from "zustand";
import { devNull } from "node:os";
import { Announcement } from "../types/timetable";

type State = {
  active: Announcement[] | null;
  loading: boolean;
  error: string | null;
  fetchActive: (data: any) => void;
};

export const useAnnouncement = create<State>((set, get) => ({
  active: null,
  loading: false,
  error: null,
  fetchActive: (data) => {
    set({ loading: true, error: null, active: data });
  },
}));
