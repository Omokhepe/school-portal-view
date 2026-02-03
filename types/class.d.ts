export interface ClassRoot {
  classes: ClassSub;
  // status: number;
}

interface ClassSub {
  creche: Classes[];
  primary: Classes[];
  jss: Classes[];
  sss: Classes[];
}

type Classes = {
  id: number;
  name: string;
  level: string;
};

export type FormDataType = {
  topic: string;
  weeks: number[];
  term: number;
  class_id: string | number;
  subject_id: string | number;
  content: Array<{
    subtopic?: string;
    note?: string;
    image?: File | null;
  }>;
};

type AnnouncementPayload = {
  subject: string;
  message: string;
  start_date: string;
  end_date: string;
};
