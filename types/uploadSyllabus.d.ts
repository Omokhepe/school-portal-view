export type SyllabusUploadForm = {
  file: File | null;
  school_year: string;
  notify_email?: string;
  notify_phone?: string;
};

export type UploadState = {
  loading: boolean;
  error: string | null;
};

export type UploadResponse = {
  message: string;
  path?: string;
};
