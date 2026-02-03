import { useMemo, useState } from "react";
import { ClassSub } from "../types/class";
import { SubjectType } from "../types/user";

export function useClassSelector(classes: ClassSub, subjects: SubjectType[]) {
  const [classId, setClassId] = useState<string>("");
  const [level, setLevel] = useState<string>("");

  const allClasses = useMemo(
    () => [
      ...classes.creche,
      ...classes.primary,
      ...classes.jss,
      ...classes.sss,
    ],
    [classes],
  );

  const classMap = useMemo(
    () => Object.fromEntries(allClasses.map((c) => [c.id, c])),
    [allClasses],
  );

  const subjectsForClass = useMemo(
    () => subjects.filter((s) => s.level_group === level),
    [subjects, level],
  );

  const selectClass = (id: string) => {
    setClassId(id);
    setLevel(classMap[Number(id)]?.level ?? "");
  };

  return {
    classId,
    subjectsForClass,
    selectClass,
  };
}
