import { Classes } from "./class";

export interface UserType {
  address: string;
  class_id?: number;
  class: Classes;
  // course?: any;
  created_at: string;
  date_of_birth: string;
  // degree?: any;
  email: string;
  first_name: string;
  gender: string;
  // highest_education?: any;
  id: number;
  image: string;
  last_name: string;
  must_change_password: number;
  // parent_address?: any;
  // parent_email?: any;
  // parent_first_name?: any;
  // parent_last_name?: any;
  // parent_phone?: any;
  phone_number?: string;
  // reference_email?: any;
  // reference_name?: any;
  // reference_phone?: any;
  role: string;
  state_of_origin: string;

  student_profile?: StudentProfile;
  staff_profile?: StaffProfile;

  updated_at: string;
  user_id: string;
  username: string;
}

export interface StudentProfile {
  created_at: string;
  id: number;
  parent_address: string;
  parent_email: string;
  parent_first_name: string;
  parent_last_name: string;
  parent_phone: string;
  updated_at: string;
  user_id: string;
}

export interface StaffProfile {
  course: string;
  created_at: string;
  highest_education: string;
  id: number;
  reference_email: string;
  reference_name: string;
  reference_phone: string;
  updated_at: string;
  user_id: string;
}

export interface SubjectType {
  color: string;
  created_at: any;
  id: number;
  level_group: string;
  name: string;
  updated_at: any;
}
