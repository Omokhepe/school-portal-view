"use client";

import React, { useState } from "react";
import { addUser } from "@actions/user";
import { useAuthStore } from "@store/authStore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DialogForm from "@components/Modal";

const AddUser = ({ dataClass }) => {
  const token = useAuthStore((s) => s.token);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState();
  const [formData, setFormData] = useState({
    inputName: "",
    inputEmail: "",
    role: "",
    studentClass: "",
  });

  const handleFormSubmit = async () => {
    try {
      const payload = {
        name: formData.inputName.trim(),
        email: formData.inputEmail,
        role: formData.role,
        ...(formData.role === "student" && { class_id: formData.studentClass }),
      };
      console.log(payload, "checking Payload");
      const res = await addUser(token, payload);
      // setInputEmail("");
      // setInputName("");
      console.log(res, "response");
      toast.success("User created successfully.");
      // console.log(name, email, studentClass, role, "all values");
    } catch (err: any) {
      toast.error("Error creating user");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  console.log(dataClass.classes, "classes hahahaha");

  return (
    <>
      <div>
        <Button
          variant="secondary"
          className="bg-yellow-900 text-off-white hover:bg-grey900 hover:text-beige100 h-12"
          onClick={() => setOpen(true)}
        >
          <Plus />
          Click to Add New User
        </Button>

        {/* Reusable dialog */}
        <DialogForm
          open={open}
          setOpen={setOpen}
          title="Add New User"
          onSave={handleFormSubmit}
          fullName="Full Name"
          emailText="Email Address"
          dataClass={dataClass}
          formData={formData}
          setFormData={setFormData}
        />
      </div>

      {/*<h3 className="text-grey900 text-2xl font-bold pt-4">Add User</h3>*/}
      {/*<form*/}
      {/*  onSubmit={handleFormSubmit}*/}
      {/*  className="card_wrap flex flex-wrap flex-row p-5 py-8"*/}
      {/*>*/}
      {/*  <div className="form-group w-120 flex mr-9 items-center">*/}
      {/*    <label htmlFor="name" className="w-50">*/}
      {/*      Enter Full Name:*/}
      {/*    </label>*/}
      {/*    <Input*/}
      {/*      type="text"*/}
      {/*      value={inputName}*/}
      {/*      onChange={(e) => setInputName(e.target.value)}*/}
      {/*      placeholder="Enter Full Name"*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <div className="form-group w-120 flex mr-9 items-center">*/}
      {/*    <label htmlFor="email" className="w-70">*/}
      {/*      Enter Email Address:*/}
      {/*    </label>*/}
      {/*    <Input*/}
      {/*      type="email"*/}
      {/*      value={inputEmail}*/}
      {/*      onChange={(e) => setInputEmail(e.target.value)}*/}
      {/*      placeholder="Enter Email Address"*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <div className="w-80 flex items-center">*/}
      {/*    <label htmlFor="role" className="w-40">*/}
      {/*      Select Role:*/}
      {/*    </label>*/}
      {/*    <NativeSelect*/}
      {/*      className="w-50"*/}
      {/*      value={role}*/}
      {/*      onChange={(e) => setRole(e.target.value)}*/}
      {/*    >*/}
      {/*      <NativeSelectOption value="">Select Role</NativeSelectOption>*/}
      {/*      <NativeSelectOption value="admin">Admin</NativeSelectOption>*/}
      {/*      <NativeSelectOption value="teacher">Teacher</NativeSelectOption>*/}
      {/*      <NativeSelectOption value="student">Student</NativeSelectOption>*/}
      {/*    </NativeSelect>*/}
      {/*  </div>*/}
      {/*  <div className="mt-7">*/}
      {/*    <div className="w-80 flex items-center">*/}
      {/*      <label htmlFor="classes" className="w-40">*/}
      {/*        Select Classes*/}
      {/*      </label>*/}
      {/*      <NativeSelect*/}
      {/*        className="w-50"*/}
      {/*        value={studentClass}*/}
      {/*        onChange={(e) => setStudentClass(e.target.value)}*/}
      {/*      >*/}
      {/*        <NativeSelectOption value="">Select Class</NativeSelectOption>*/}
      {/*        <NativeSelectOptGroup label="Creche">*/}
      {/*          {dataClass.creche?.map((item) => (*/}
      {/*            <NativeSelectOption key={item.id} value={item.id}>*/}
      {/*              {item.name}*/}
      {/*            </NativeSelectOption>*/}
      {/*          ))}*/}
      {/*        </NativeSelectOptGroup>*/}
      {/*        <NativeSelectOptGroup label="Primary">*/}
      {/*          {dataClass.primary?.map((item) => (*/}
      {/*            <NativeSelectOption key={item.id} value={item.id}>*/}
      {/*              {item.name}*/}
      {/*            </NativeSelectOption>*/}
      {/*          ))}*/}
      {/*        </NativeSelectOptGroup>*/}
      {/*        <NativeSelectOptGroup label="Secondary">*/}
      {/*          {dataClass.secondary?.map((item) => (*/}
      {/*            <NativeSelectOption key={item.id} value={item.id}>*/}
      {/*              {item.name}*/}
      {/*            </NativeSelectOption>*/}
      {/*          ))}*/}
      {/*        </NativeSelectOptGroup>*/}
      {/*      </NativeSelect>*/}
      {/*    </div>*/}
      {/*    <button*/}
      {/*      className="w-70 h-10 rounded-sm text-off-white font-bold text-sm  bg-yellow-900"*/}
      {/*      type="submit"*/}
      {/*      // onClick={(e) => handleFormSubmit(e)}*/}
      {/*    >*/}
      {/*      {loading ? `Saving ${role.toUpperCase()}` : "Add User"}*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*</form>*/}
    </>
  );
};

export default AddUser;
