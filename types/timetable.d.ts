export type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type TimetableEntry = {
  id: number;
  class_id: number;
  subject_id: number;
  teacher_id?: number | null;
  day: Day;
  start_time: string; // "08:00"
  end_time: string; // "09:00"
  subject?: { id: number; name: string };
  teacher?: { id: number; name: string };
};

export type AnnouncementType = {
  id: number;
  subject: string;
  message: string;
  start_date: string;
  end_date: string;
  status: string;
};

export interface DeleteModalValues {
  subject: string;
  id: string | number;
}

export interface DeleteModalProps {
  openDelete: boolean;
  setOpenDelete: (state: boolean) => void;
  initialValues: DeleteModalValues;
  onConfirm: (values: React.MouseEvent<HTMLButtonElement>) => void;
}
