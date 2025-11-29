// components/NoteModal.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultiSelect from "@components/MultiSelect";
import { weekOptions } from "../../../constant/data";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { ClassSub } from "@types/class";
import { addNote } from "@actions/user";

// ---------------- TYPES ----------------
type ClassItem = { id: string | number; name: string; level: string };
type SubjectItem = { id: number; name: string; level_group: string };

type SubtopicItem =
  | { type: "subtitle"; subtitle: string }
  | { type: "content"; content: string }
  | { type: "image"; image: File | null };

type FormDataShape = {
  studentClass?: number;
  selectedSubject?: number;
  term?: string;
  weeks?: number[];
  topic?: string;
  subtopics: SubtopicItem[];
};

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  children?: React.ReactNode;
  dataClass: ClassSub;
  subjects: SubjectItem[];
  initial?: FormDataShape;
  token: string; // auth token
};

// ---------------- COMPONENT ----------------
export default function NoteModal({
  open,
  setOpen,
  children,
  dataClass,
  subjects,
  initial,
  token,
}: Props) {
  const [form, setForm] = useState<FormDataShape>(initial ?? { subtopics: [] });
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedWeeks, setSelectedWeeks] = useState<number[]>(
    form.weeks ?? [],
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const allClasses = [
    ...dataClass.creche,
    ...dataClass.primary,
    ...dataClass.jss,
    ...dataClass.ss,
  ];

  const classLookup = Object.fromEntries(
    allClasses.map((c) => [String(c.id), c]),
  );

  const subjectsForClass = subjects.filter(
    (s) => s.level_group === selectedLevel,
  );

  // add a new sequence item
  const addSequence = (type: SubtopicItem["type"]) => {
    const next = [...form.subtopics];
    if (type === "subtitle") next.push({ type: "subtitle", subtitle: "" });
    if (type === "content") next.push({ type: "content", content: "" });
    if (type === "image") next.push({ type: "image", image: null });
    setForm({ ...form, subtopics: next });
  };

  // update a subtopic field
  const updateSubtopic = (index: number, key: string, value: any) => {
    const copy = [...form.subtopics];
    // @ts-ignore
    copy[index] = { ...copy[index], [key]: value };
    setForm({ ...form, subtopics: copy });
  };

  const removeSubtopic = (index: number) => {
    const copy = form.subtopics.filter((_, i) => i !== index);
    setForm({ ...form, subtopics: copy });
  };

  // build FormData and submit
  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setErrors({});

    console.log(form);

    // basic validation
    const newErrors: Record<string, string> = {};
    if (!form.studentClass) newErrors.studentClass = "Class required";
    if (!form.selectedSubject) newErrors.selectedSubject = "Subject required";
    if (!form.term) newErrors.term = "Term required";
    if (!form.subtopics.length) newErrors.subtopics = "Add at least one item";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    // const weeksArray = (form.weeks ?? selectedWeeks).map((w) => Number(w));
    const weeksArray = (form.weeks ?? selectedWeeks).map(Number);

    console.log(weeksArray, "weeky stuff");

    const payload = new FormData();
    payload.append("class_id", String(Number(form.studentClass)));
    payload.append("subject_id", String(Number(form.selectedSubject)));
    payload.append("term", String(Number(form.term)));
    // payload.append("weeks", JSON.stringify(weeksArray));

    weeksArray.forEach((w, i) => {
      payload.append(`weeks[${i}]`, w.toString());
    });

    payload.append("topic", form.topic ?? "");
    payload.append("school_year", "2025/2026");

    console.log(String(form.studentClass));

    // Append subtopics. Laravel accepts nested arrays when keys are like:
    // subtopics[0][type], subtopics[0][subtitle], subtopics[0][content], subtopics[0][image]
    form.subtopics.forEach((item, i) => {
      // payload.append(`subtopics[${i}][type]`, item.type);
      if (item.type === "subtitle") {
        payload.append(`subtopics[${i}][type]`, "text");
        payload.append(
          `subtopics[${i}][subtitle]`,
          (item as any).subtitle ?? "",
        );
      } else if (item.type === "content") {
        payload.append(`subtopics[${i}][type]`, "text");
        payload.append(`subtopics[${i}][content]`, (item as any).content ?? "");
      } else if (item.type === "image") {
        payload.append(`subtopics[${i}][type]`, "image");
        const file = (item as any).image;
        if (file) payload.append(`subtopics[${i}][image]`, file, file.name);
      }
    });

    // console.log("---- FORM DATA ----");
    // for (let [key, value] of payload.entries()) {
    //   console.log(key, value);
    // }
    //
    // console.log(payload, token, "payload testing");

    // call API
    await addNote(token, payload);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-3xl overflow-y-auto h-2/3">
        <DialogHeader>
          <DialogTitle>Create Note</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={submit}>
          {children}

          <div className="flex items-center flex-wrap">
            <div className="flex items-center space-y-4 w-1/2">
              <label className="w-25">Class</label>
              <select
                value={form.studentClass ?? ""}
                onChange={(e) => {
                  const id = e.target.value;
                  setForm({ ...form, studentClass: id });
                  const cls = classLookup[id];
                  setSelectedLevel(cls?.level ?? "");
                }}
                className="w-full h-10 px-5"
              >
                <option value="">Select class</option>
                <optgroup label="Creche">
                  {dataClass.creche.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Primary">
                  {dataClass.primary.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Secondary">
                  {[...dataClass.jss, ...dataClass.ss].map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </optgroup>
              </select>
              {errors.studentClass && (
                <p className="text-red-500 text-sm">{errors.studentClass}</p>
              )}
            </div>
            <div>
              <label>Subject</label>
              <select
                value={form.selectedSubject ?? ""}
                onChange={(e) =>
                  setForm({ ...form, selectedSubject: e.target.value })
                }
                className="w-full"
              >
                <option value="">Select subject</option>
                {subjectsForClass.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              {errors.selectedSubject && (
                <p className="text-red-500 text-sm">{errors.selectedSubject}</p>
              )}
            </div>
          </div>

          <div className="grid gap-2 grid-cols-[120px_1fr] items-center">
            <div>
              <label>Term</label>
              <Select onValueChange={(v) => setForm({ ...form, term: v })}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1">1st Term</SelectItem>
                    <SelectItem value="2">2nd Term</SelectItem>
                    <SelectItem value="3">3rd Term</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.term && (
                <p className="text-red-500 text-sm">{errors.term}</p>
              )}
            </div>
            <div>
              <label>Weeks</label>
              <MultiSelect
                options={weekOptions}
                value={selectedWeeks}
                onChange={(v) => {
                  setSelectedWeeks(v);
                  setForm({ ...form, weeks: v });
                }}
              />
            </div>
          </div>

          {/*<div className="grid gap-2 grid-cols-[120px_1fr] items-center"></div>*/}

          <div className="grid gap-2 grid-cols-[120px_1fr] items-center">
            <label>Topic</label>
            <Input
              value={form.topic ?? ""}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
            />
          </div>

          {/* SEQUENCE DROPDOWN */}
          <div className="grid gap-2 grid-cols-[120px_1fr] items-center">
            <label>Add</label>
            <div className="flex gap-2">
              <Select onValueChange={(v) => addSequence(v as any)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Add item" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="subtitle">Subtitle</SelectItem>
                    <SelectItem value="content">Content</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* RENDER SUBTOPICS */}
          <div className="space-y-3">
            {form.subtopics.map((s, i) => (
              <div key={i} className="border p-3 rounded-md">
                <div className="flex justify-between items-start">
                  <div className="font-medium">
                    #{i + 1} — {s.type}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSubtopic(i)}
                    className="text-sm text-red-500"
                  >
                    Remove
                  </button>
                </div>

                {s.type === "subtitle" && (
                  <div className="mt-2">
                    <label>Subtitle</label>
                    <Input
                      value={(s as any).subtitle}
                      onChange={(e) =>
                        updateSubtopic(i, "subtitle", e.target.value)
                      }
                    />
                  </div>
                )}

                {s.type === "content" && (
                  <div className="mt-2">
                    <label>Content</label>
                    <Textarea
                      value={(s as any).content}
                      onChange={(e) =>
                        updateSubtopic(i, "content", e.target.value)
                      }
                    />
                  </div>
                )}

                {s.type === "image" && (
                  <div className="mt-2">
                    <label>Image</label>
                    <Input
                      type="file"
                      onChange={(e) =>
                        updateSubtopic(i, "image", e.target.files?.[0] ?? null)
                      }
                    />
                    {(s as any).image && (
                      <div className="text-xs mt-1">
                        Selected: {(s as any).image.name}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {errors.subtopics && (
            <p className="text-red-500 text-sm">{errors.subtopics}</p>
          )}
          {errors.submit && (
            <p className="text-red-500 text-sm">{errors.submit}</p>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="submit" className="bg-yellow-900">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
