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
  emailText?: string;
  children?: React.ReactNode;
  onSave: (value: any) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  dataClass?: any[]; // or use a more specific type like { id: number; name: string }[]
  formData: Record<string, any>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

export default function DialogForm({
  title = "Add New",
  fullName,
  emailText,
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
  const [inputEmail, setInputEmail] = useState("");
  const { classes } = dataClass;

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData); // send data upward
    setOpen(false);
  };

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
            <Input
              id="name"
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
                setFormData({ ...formData, inputName: e.target.value });
              }}
              required={true}
            />
          </div>

          <div className="grid gap-2 grid-cols-[100px_1fr] items-center">
            <label htmlFor="amount">{emailText}</label>
            <Input
              id="amount"
              // type="number"
              required
              value={inputEmail}
              onChange={(e) => {
                setInputEmail(e.target.value);
                setFormData({ ...formData, inputEmail: e.target.value });
              }}
            />
          </div>

          {children}
          <div className="grid gap-2 mt-4 grid-cols-[100px_1fr] items-center">
            <label htmlFor="role" className="w-30">
              Select Role:
            </label>
            <NativeSelect
              className="w-70"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setFormData({ ...formData, role: e.target.value });
              }}
            >
              <NativeSelectOption value="">Select Role</NativeSelectOption>
              <NativeSelectOption value="admin">Admin</NativeSelectOption>
              <NativeSelectOption value="teacher">Teacher</NativeSelectOption>
              <NativeSelectOption value="student">Student</NativeSelectOption>
            </NativeSelect>
          </div>

          {/* Always show Classes dropdown */}
          {role === "student" && (
            <div className="grid gap-2 grid-cols-[100px_1fr] items-center">
              <label htmlFor="classes" className="w-30">
                Select Classes
              </label>
              <NativeSelect
                className="w-70"
                value={studentClass}
                onChange={(e) => {
                  setStudentClass(e.target.value);
                  setFormData({ ...formData, studentClass: e.target.value });
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
                  {classes.secondary?.map((item) => (
                    <NativeSelectOption key={item.id} value={item.id}>
                      {item.name}
                    </NativeSelectOption>
                  ))}
                </NativeSelectOptGroup>
              </NativeSelect>
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
