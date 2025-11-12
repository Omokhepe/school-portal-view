export interface LoginResponse {
  token: string | null;
  user: User | null;
  must_change_password: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  must_change_password: number;
  class_id: number;
}
