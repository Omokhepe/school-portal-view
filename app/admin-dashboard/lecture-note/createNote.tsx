"use client";

import React, { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select";
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
import { useAuthStore } from "@store/authStore";
import useAppStore from "@store/appStore";
import { X } from "lucide-react";
import { toast } from "sonner";
import { addNote } from "@actions/user";
import NoteEditor from "@/admin-dashboard/lecture-note/noteEditor";

type Section = {
  subtitle: string;
  content: string;
  image?: File | null;
  preview?: string | null;
};

type Props = {
  showNote: boolean;
  setShowNote: (showNote: boolean) => void;
};

export default function CreateNote() {
  const { classes, subjects } = useAppStore();
  const token = useAuthStore((s) => s.token);

  const [topic, setTopic] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
  const [selectedWeeks, setSelectedWeeks] = useState<string[]>([]);
  const [term, setTerm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sections, setSections] = useState<Section[]>([]);
  // const [pendingImages, setPendingImages] = useState<File | null>(null);
  const [pendingImages, setPendingImages] = useState<File[]>([]);

  if (!classes) return null;

  const allClasses = [
    ...classes.creche,
    ...classes.primary,
    ...classes.jss,
    ...classes.sss,
  ];

  const classLookup = Object.fromEntries(
    allClasses.map((c) => [String(c.id), c]),
  );

  const subjectsForClass = subjects.filter(
    (s) => s.level_group === selectedLevel,
  );

  const addSection = () => {
    setSections([...sections, { subtitle: "", content: "", image: null }]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const updateSection = (index: number, updated: Partial<Section>) => {
    setSections((prev) => {
      const newList = [...prev];
      newList[index] = { ...newList[index], ...updated };
      return newList;
    });
  };

  const handleImageSelect = (
    index: number,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    const preview = URL.createObjectURL(file);
    updateSection(index, { image: file, preview });
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.url;
  };

  const submitNote = async (): Promise<void> => {
    const form = new FormData();

    form.append("topic", topic);
    form.append("subject_id", String(selectedSubject));
    form.append("class_id", studentClass);
    form.append("weeks", JSON.stringify(selectedWeeks));
    form.append("school_year", "2025/2026");
    form.append("term", term);
    console.log("here hahaha", sections);
    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      console.log("here hahaha", sec);

      form.append(`subtopics[${i}][subtitle]`, sec.subtitle);
      form.append(`subtopics[${i}][content]`, sec.content);
      form.append(`subtopics[${i}][type]`, "rich");

      // if (sec.image) {
      //   const imageUrl = await uploadImage(sec.image);
      //   form.append(`subtopics[${i}][image]`, sec.pendingImages);
      // }
      if (pendingImages?.length > 0) {
        // const urls = await Promise.all(sec.pendingImages.map(uploadImage));
        form.append(`subtopics[${i}][images]`, pendingImages[i]);
      }
    }

    // console.log("---- FORM DATA ----");
    // for (let [key, value] of form.entries()) {
    //   console.log(key, value);
    // }
    try {
      const noteAdded = await addNote(token, form);
      if (noteAdded.status === "success") {
        toast.success(noteAdded.message ?? "Note has been added.");
        setTopic("");
        setSections([]);
        setSelectedWeeks([]);
        setSelectedSubject(null);
        setStudentClass("");
        setTerm("");
      }
      console.log(noteAdded, "checking here");
    } catch (err: any) {
      console.log(err);
      toast.error(err.message || "Something went wrong");
    }

    // if (res.ok) {
    //   toast.success("Lesson Note Created");
    //   setTopic("");
    //   setSections([]);
    //   setSelectedWeeks([]);
    //   setSelectedSubject(null);
    //   setStudentClass("");
    // }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 bg-off-white rounded-sm mt-5">
      <div className="flex justify-between  w-full">
        <h1 className="font-semibold text-lg">Create Lesson Note</h1>

        {/*<CircleX onClick={() => setShowNote(!showNote)} />*/}
      </div>

      {/* CLASS SELECTION */}
      <div className="flex flex-wrap gap-5">
        {/* Class */}
        <div className="flex items-center">
          <label className="w-12">Class</label>
          <NativeSelect
            className={`w-40 ${errors.studentClass ? "border-red-500" : ""}`}
            value={studentClass}
            onChange={(e) => {
              const id = e.target.value;
              setStudentClass(id);
              const cls = classLookup[id];
              setSelectedLevel(cls?.level ?? "");
            }}
          >
            <NativeSelectOption value="">Select Class</NativeSelectOption>
            <NativeSelectOptGroup label="Creche">
              {classes.creche?.map((item) => (
                <NativeSelectOption key={item.id} value={item.id}>
                  {item.name}
                </NativeSelectOption>
              ))}
            </NativeSelectOptGroup>

            <NativeSelectOptGroup label="Primary">
              {classes.primary?.map((item) => (
                <NativeSelectOption key={item.id} value={item.id}>
                  {item.name}
                </NativeSelectOption>
              ))}
            </NativeSelectOptGroup>

            <NativeSelectOptGroup label="Secondary">
              {[...classes.jss, ...classes.sss].map((item) => (
                <NativeSelectOption key={item.id} value={item.id}>
                  {item.name}
                </NativeSelectOption>
              ))}
            </NativeSelectOptGroup>
          </NativeSelect>
        </div>

        {/* SUBJECT */}
        <div className="flex items-center">
          <label className="w-15">Subject</label>
          <Select
            onValueChange={(v) => setSelectedSubject(Number(v))}
            value={selectedSubject?.toString() ?? ""}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {subjectsForClass.map((s) => (
                  <SelectItem key={s.id} value={String(s.id)}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center">
          <label className="w-12">Term</label>
          <Select onValueChange={(v) => setTerm(v)}>
            <SelectTrigger className="w-40">
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
          {errors.term && <p className="text-red-500 text-sm">{errors.term}</p>}
        </div>

        {/* WEEKS */}
        <div className="flex items-center">
          <label className="w-12 mr-5">Weeks</label>
          <MultiSelect
            options={weekOptions}
            value={selectedWeeks}
            onChange={setSelectedWeeks}
          />
        </div>
      </div>

      {/* TOPIC */}
      <div className="grid gap-2 grid-cols-[120px_1fr] items-center">
        <label>Topic</label>
        <Input
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      {/* SECTIONS */}
      {sections.map((sec, index) => (
        <div key={index} className="border p-4 rounded-xl bg-white space-y-3">
          <div className="grid grid-cols-[70px_minmax(120px,_1fr)_60px] gap-3 items-center">
            <label>Subtitle</label>
            <Input
              value={sec.subtitle}
              onChange={(e) =>
                updateSection(index, { subtitle: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => removeSection(index)}
              className="text-red-500 ml-5 "
            >
              <X className="hover:border-1 hover:border-red-700 text-center" />
            </button>
          </div>

          {/* Remove section */}

          {/* Image Upload */}
          {/*<div>*/}
          {/*  <input*/}
          {/*    type="file"*/}
          {/*    accept="image/*"*/}
          {/*    onChange={(e) => handleImageSelect(index, e)}*/}
          {/*  />*/}
          {/*  {sec.preview && (*/}
          {/*    <img*/}
          {/*      src={sec.preview}*/}
          {/*      alt="Preview"*/}
          {/*      className="w-32 h-32 object-cover rounded-md mt-2"*/}
          {/*    />*/}
          {/*  )}*/}
          {/*</div>*/}

          {/* Editor */}
          <NoteEditor
            content={sec.content}
            onChange={(html) => updateSection(index, { content: html })}
            sendImg={setPendingImages}
            onImageUpload={uploadImage}
          />
        </div>
      ))}

      <Button onClick={addSection}>Add Section</Button>

      <Button className="w-full mt-4 bg-yellow-900" onClick={submitNote}>
        Submit
      </Button>
    </div>
  );
}
