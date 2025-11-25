import useAppStore from "@store/appStore";
import { apiFetch } from "@lib/helper";

export const fetchedClasses = async (token: string, force = false) => {
  const store = useAppStore.getState();

  if (store.fetched.classes && !force) return store.classes;
  if (store.inFlight.classes) return;

  store.startLoading("classes");

  try {
    const data = await apiFetch("/classes", token);
    // adapt depending on API shape
    const classes = Array.isArray(data) ? data : (data?.classes ?? []);

    store.setData("classes", classes);

    return classes;
  } catch (err) {
    store.finishLoading("classes");
    throw err;
  }
};

export const fetchedSubjects = async (token: string, force = false) => {
  const store = useAppStore.getState();

  if (store.fetched.subjects && !force) return store.subjects;
  if (store.inFlight.subjects) return;

  store.startLoading("subjects");

  try {
    const data = await apiFetch("/subjects", token);
    const subjects = Array.isArray(data) ? data : (data?.subjects ?? []);
    useAppStore.getState().setData("subjects", subjects);
    return subjects;
  } catch (err) {
    store.finishLoading("subjects");
    throw err;
  }
};

export const fetchedStudents = async (token: string, force = true) => {
  const store = useAppStore.getState();

  if (store.fetched.students && !force) return store.students;
  if (store.inFlight.students) return;

  store.startLoading("students");

  try {
    const data = await apiFetch("/students", token);
    const students = Array.isArray(data) ? data : (data?.students ?? []);
    useAppStore.getState().setData("students", students);
    return students;
  } catch (err) {
    store.finishLoading("students");
    throw err;
  }
};

export const fetchedTeachers = async (token: string, force = true) => {
  const store = useAppStore.getState();

  if (store.fetched.teachers && !force) return store.teachers;
  if (store.inFlight.teachers) return;

  store.startLoading("teachers");

  try {
    const data = await apiFetch("/teachers", token);
    const teachers = Array.isArray(data) ? data : (data?.teachers ?? []);
    useAppStore.getState().setData("teachers", teachers);
    return teachers;
  } catch (err) {
    store.finishLoading("teachers");
    throw err;
  }
};

export const fetchedUsers = async (token: string, force = false) => {
  const store = useAppStore.getState();

  if (store.fetched.users && !force) return store.users;
  if (store.inFlight.users) return store.users;

  store.startLoading("users");

  try {
    const data = await apiFetch("/users", token);
    const users = Array.isArray(data) ? data : (data?.users ?? []);
    console.log("check 3.0 users", store.fetched.users, users);
    useAppStore.getState().setData("users", users);
    return users;
  } catch (err) {
    store.finishLoading("users");
    throw err;
  }
};
