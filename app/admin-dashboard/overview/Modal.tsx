"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select";

type DialogFormProps = {
  title?: string;
  fullName?: string;
  userText?: string;
  children?: React.ReactNode;
  onSave: (value: any) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  dataClass: any[]; // or use a more specific type like { id: number; name: string }[]
  formData: Record<string, any>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

type inputDataProps = {
  role?: string;
  inputName?: string;
  inputUsername?: string;
  studentClass?: string;
};

export default function DialogForm({
  title = "Add New",
  fullName,
  userText,
  children,
  onSave,
  open,
  setOpen,
  dataClass,
  formData,
  setFormData,
}: DialogFormProps) {
  const [studentClass, setStudentClass] = useState("");
  const [role, setRole] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  // const classes = dataClass;
  const [errors, setErrors] = useState<inputDataProps>({});

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: any = {};

    if (!formData.inputName || formData.inputName.trim() === "") {
      newErrors.inputName = "Full Name is required";
    }
    if (!formData.inputUsername || formData.inputUsername.trim() === "") {
      newErrors.inputUsername = "Username is required";
    }
    if (!formData.role) {
      newErrors.role = "Role is required";
    }
    if (formData.role === "student" && !formData.studentClass) {
      newErrors.studentClass = "Student Class is required";
    }

    // If errors exist → stop submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // No errors → proceed
    setErrors({});

    onSave(formData); // send data upward
    setOpen(false);
  };
  console.log(errors, "errors on popup");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSave}>
          <span className="text-xs">Fill All Fields</span>
          <div className="grid gap-2 grid-cols-[100px_1fr] items-center">
            <label htmlFor="name">{fullName}</label>
            <div className="flex flex-col">
              <Input
                id="name"
                value={inputName}
                className={`${errors.inputName ? "border-red-500" : ""}`}
                onChange={(e) => {
                  setInputName(e.target.value);
                  setFormData({ ...formData, inputName: e.target.value });
                  setErrors({ ...errors, inputName: undefined });
                }}
                // required={true}
              />
              {errors.inputName && (
                <p className="text-red-500 text-sm mt-1 w-70 font-bold">
                  {errors.inputName}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-2 grid-cols-[100px_1fr] items-center">
            <label htmlFor="username">{userText}</label>
            <div className="flex flex-col">
              <Input
                id="usename"
                className={`w-72 ${errors.inputUsername ? "border-red-500" : ""}`}
                // type="number"
                // required
                value={inputUsername}
                onChange={(e) => {
                  setInputUsername(e.target.value);
                  setFormData({ ...formData, inputUsername: e.target.value });
                  setErrors({ ...errors, inputUsername: undefined });
                }}
              />
              {errors.inputUsername && (
                <p className="text-red-500 text-sm mt-1 w-70 font-bold">
                  {errors.inputUsername}
                </p>
              )}
            </div>
          </div>

          {children}
          <div className="grid gap-2 mt-4 grid-cols-[100px_1fr] items-center">
            <label htmlFor="role" className="w-30">
              Select Role:
            </label>
            <div className="flex flex-col">
              <NativeSelect
                // className="w-70"
                className={`w-72 ${errors.role ? "border-red-500" : ""}`}
                value={role}
                // required={true}
                onChange={(e) => {
                  const value = e.target.value;
                  setRole(value);
                  setFormData({ ...formData, role: value });
                  setErrors({ ...errors, role: undefined });
                }}
              >
                <NativeSelectOption value="">Select Role</NativeSelectOption>
                <NativeSelectOption value="admin">Admin</NativeSelectOption>
                <NativeSelectOption value="teacher">Teacher</NativeSelectOption>
                <NativeSelectOption value="student">Student</NativeSelectOption>
              </NativeSelect>

              {errors.role && (
                <p className="text-red-500 text-sm mt-1 w-70 font-bold">
                  {errors.role}
                </p>
              )}
            </div>
          </div>

          {/* Always show Classes dropdown */}
          {role === "student" && (
            <div className="grid gap-2 grid-cols-[100px_1fr] items-center">
              <label htmlFor="classes" className="w-30">
                Select Classes
              </label>
              <div className="flex flex-col">
                <NativeSelect
                  className={`w-72 ${errors.studentClass ? "border-red-500" : ""}`}
                  value={studentClass}
                  onChange={(e) => {
                    setStudentClass(e.target.value);
                    setFormData({ ...formData, studentClass: e.target.value });
                    setErrors({ ...errors, studentClass: undefined });
                  }}
                >
                  <NativeSelectOption value="">Select Class</NativeSelectOption>
                  <NativeSelectOptGroup label="Creche">
                    {dataClass.creche?.map((item) => (
                      <NativeSelectOption key={item.id} value={item.id}>
                        {item.name}
                      </NativeSelectOption>
                    ))}
                  </NativeSelectOptGroup>
                  <NativeSelectOptGroup label="Primary">
                    {dataClass.primary?.map((item) => (
                      <NativeSelectOption key={item.id} value={item.id}>
                        {item.name}
                      </NativeSelectOption>
                    ))}
                  </NativeSelectOptGroup>
                  <NativeSelectOptGroup label="Secondary">
                    {dataClass.jss?.map((item) => (
                      <NativeSelectOption key={item.id} value={item.id}>
                        {item.name}
                      </NativeSelectOption>
                    ))}
                    {dataClass.ss?.map((item) => (
                      <NativeSelectOption key={item.id} value={item.id}>
                        {item.name}
                      </NativeSelectOption>
                    ))}
                  </NativeSelectOptGroup>
                </NativeSelect>
                {errors.studentClass && (
                  <p className="text-red-500 text-sm mt-1 w-70 font-bold">
                    {errors.studentClass}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 w-full">
            <Button type="submit" className="w-full bg-yellow-900">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
