import { create } from "zustand";
import { AnnouncementType } from "../types/timetable";

type State = {
  active: AnnouncementType[] | null;
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
