import {
  GraduationCap,
  Home,
  LucidePencilRuler,
  Notebook,
  UserIcon,
} from "lucide-react";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/admission", label: "Admission" },
  { href: "/login", label: "E-Portal" },
];

export const sideNavLinks = [
  { href: "/admin-dashboard/home", label: "Home", icon: <Home /> },
  {
    href: "/admin-dashboard/student",
    label: "Student",
    icon: <GraduationCap />,
  },
  {
    href: "/admin-dashboard/teacher",
    label: "Teacher",
    icon: <UserIcon />,
  },
  // {
  //   href: "/admin-dashboard/overview",
  //   label: "Add Student/Teachers",
  //   icon: <UserIcon />,
  // },
  {
    href: "/admin-dashboard/lecture-note",
    label: "Lecture Note",
    icon: <Notebook />,
    isLectureNote: true,
  },
  {
    href: "/admin-dashboard/schedule",
    label: "TimeTable",
    icon: <LucidePencilRuler />,
  },
];

export const groupedLevel = [
  {
    value: "creche",
    label: "creche",
  },
  {
    value: "primary",
    label: "primary",
  },
  {
    value: "jss",
    label: "junior secondary",
  },
  {
    value: "ss",
    label: "senior secondary",
  },
];

export const weekOptions = [
  { value: "1", label: "Week 1" },
  { value: "2", label: "Week 2" },
  { value: "3", label: "Week 3" },
  { value: "4", label: "Week 4" },
  { value: "5", label: "Week 5" },
  { value: "6", label: "Week 6" },
  { value: "7", label: "Week 7" },
  { value: "8", label: "Week 8" },
  { value: "9", label: "Week 9" },
  { value: "10", label: "Week 10" },
  { value: "11", label: "Week 11" },
  { value: "12", label: "Week 12" },
  { value: "13", label: "Week 13" },
];

export const slots = [
  { start: "08:00", end: "08:40" },
  { start: "08:40", end: "09:20" },
  { start: "09:20", end: "10:00" },
  { start: "10:00", end: "10:10" },
  { start: "10:10", end: "10:50" },
  { start: "10:50", end: "11:30" },
  { start: "11:30", end: "12:00" },
  { start: "12:50", end: "12:40" },
  { start: "12:40", end: "13:20" },
  { start: "13:20", end: "14:00" },
  { start: "14:00", end: "14:30" },
  { start: "14:30", end: "15:00" },
  { start: "15:00", end: "15:30" },
];

export const FIXED_BREAKS = [
  {
    id: "break-1",
    label: "Short Break",
    start: "10:00",
    end: "10:10",
    type: "break",
  },
  {
    id: "break-2",
    label: "Long Break",
    start: "11:30",
    end: "12:00",
    type: "break",
  },
  {
    id: "break-3",
    label: "Lesson Break",
    start: "14:00",
    end: "14:30",
    type: "break",
  },
];

export const EduQualifications = [
  "Primary School Leaving Certificate",
  "Junior Secondary School Certificate",
  "Senior Secondary Certificate",
  "Trade Test",
  "National Diploma (ND)",
  "Higher National Diploma (HND)",
  "Bachelor's Degree",
  "Professional Diploma",
  "Postgraduate Diploma",
  "Masters Degree",
  "Doctorate Degree",
  "NCE",
  "Professional Certifications",
  "Seminary Certificate",
  "Quranic Certificate",
  "Apprenticeship",
];

export const gender = ["male", "female"];

export const noteActions = [
  { label: "Add Subtopic", type: "subtitle" },
  { label: "Add Content", type: "content" },
  { label: "Add Image", type: "image" },
];
