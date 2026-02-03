"use client";

import React, { useRef, useState, FormEvent } from "react";
import ImageUpload from "@/admin-dashboard/student/imageUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EduQualifications, gender } from "../constant/data";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useAuthStore } from "@store/authStore";
import useAppStore from "@store/appStore";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { refreshResources } from "../hooks/useData";
import { CircleX } from "lucide-react";
import { UserType } from "../types/user";

// --------------------
// ErrorText
// --------------------
const ErrorText = ({ message }: { message?: string }) =>
  message ? <p className="text-red-500 text-sm mt-1">{message}</p> : null;

// --------------------
// Props
// --------------------
interface UserFormProps {
  type: "student" | "teacher";
  setShowForm: (showForm: boolean) => void;
  user?: UserType;
}

interface FormErrors {
  [key: string]: string;
}

// --------------------
// Component
// --------------------
const UserForm: React.FC<UserFormProps> = ({ type, setShowForm, user }) => {
  const token = useAuthStore((s) => s.token);
  const classes = useAppStore((s) => s.classes);

  const [studentClass, setStudentClass] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [qualification, setQualification] = useState("");
  const [userGender, setUserGender] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --------------------
  // Refs
  // --------------------
  const refs = {
    first_name: useRef<HTMLInputElement>(null),
    last_name: useRef<HTMLInputElement>(null),
    username: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    phone_number: useRef<HTMLInputElement>(null),
    date_of_birth: useRef<HTMLInputElement>(null),
    state_of_origin: useRef<HTMLInputElement>(null),
    address: useRef<HTMLTextAreaElement>(null),

    parent_first_name: useRef<HTMLInputElement>(null),
    parent_last_name: useRef<HTMLInputElement>(null),
    parent_email: useRef<HTMLInputElement>(null),
    parent_phone: useRef<HTMLInputElement>(null),
    parent_address: useRef<HTMLTextAreaElement>(null),

    course: useRef<HTMLInputElement>(null),
    reference_name: useRef<HTMLInputElement>(null),
    reference_phone: useRef<HTMLInputElement>(null),
    reference_email: useRef<HTMLInputElement>(null),
  };

  // --------------------
  // Validation
  // --------------------
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!imageFile) newErrors.image = "Photo is required";
    if (!userGender) newErrors.gender = "Gender is required";

    const generalFields = [
      ["first_name", "First name is required"],
      ["last_name", "Last name is required"],
      ["username", "Username is required"],
      ["phone_number", "Phone number is required"],
      ["date_of_birth", "Date of birth is required"],
      ["state_of_origin", "State of origin is required"],
      ["address", "Address is required"],
    ] as const;

    generalFields.forEach(([key, msg]) => {
      if (!refs[key].current?.value) newErrors[key] = msg;
    });

    if (type === "student") {
      [
        "parent_first_name",
        "parent_last_name",
        "parent_phone",
        "parent_address",
      ].forEach((key) => {
        if (!refs[key as keyof typeof refs].current?.value)
          newErrors[key] = `${key.replace(/_/g, " ")} is required`;
      });
      if (!studentClass) newErrors.studentClass = "Class is required";
    }

    if (type === "teacher") {
      if (!qualification)
        newErrors.qualification = "Highest education is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --------------------
  // Build Payload
  // --------------------
  const buildPayload = (): FormData => {
    const formData = new FormData();

    Object.entries(refs).forEach(([key, ref]) => {
      const val = ref.current?.value;
      if (val) formData.append(key, val);
    });

    formData.append("gender", userGender);

    if (type === "student") {
      formData.append("role", "student");
      formData.append("class_id", studentClass);
    }

    if (type === "teacher") {
      formData.append("role", "teacher");
      formData.append("highest_education", qualification);
    }

    if (imageFile) formData.append("image", imageFile);

    return formData;
  };

  // --------------------
  // Reset
  // --------------------
  const resetForm = () => {
    Object.values(refs).forEach((ref) => {
      if (ref.current) ref.current.value = "";
    });

    setQualification("");
    setStudentClass("");
    setUserGender("");
    setImageFile(null);
    setErrors({});
  };

  // --------------------
  // Submit
  // --------------------
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload = buildPayload();

      // console.log(payload, "Its the Lord");
      // console.log("---- FORM DATA ----");
      // for (let [key, ref] of payload.entries()) {
      //   console.log(key, ref);
      // }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      console.log(res, "api response");

      if (res.status === 201) {
        await refreshResources(["users", "students", "teachers"], token);
        resetForm();
        setShowForm(false);
        toast.success(
          `${type === "student" ? "Student" : "Teacher"} created successfully`,
        );
      }
    } catch {
      toast.error("An error occurred while submitting the form");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --------------------
  // JSX
  // --------------------
  return (
    <div className="space-y-6">
      {/* ---------------- Photo ---------------- */}
      <div className="w-full bg-off-white gap-16 m-5 rounded-xl">
        <div className="flex items-center justify-between bg-yellow-900 w-full rounded-t-xl  p-3 text-off-white">
          <h2 className="font-mono font-bold text-2xl ">
            {type === "student" ? "Student Details" : "Teacher Details"}
          </h2>
          <CircleX onClick={() => setShowForm(false)} />
        </div>

        <div className="w-full flex bg-yellow-50">
          <div className="w-1/5 p-5">
            <label className="font-bold font-manrope text-2xl">Photo</label>
            <ImageUpload onChange={setImageFile} />
            <ErrorText message={errors.image} />
          </div>

          {/* ---------------- Basic Info ---------------- */}
          <div className="w-4/5 p-5 flex flex-wrap flex-row items-center gap-4">
            {[
              {
                label: "First Name",
                ref: refs.first_name,
                placeholder: "Enter First Name",
                error: errors.firstName,
              },
              {
                label: "Last Name",
                ref: refs.last_name,
                placeholder: "Enter Last Name",
                error: errors.lastName,
              },
              {
                label: "Username",
                ref: refs.username,
                error: errors.username,
                placeholder: "Enter Username",
              },
              {
                label: "Email",
                ref: refs.email,
                error: errors.email,
                placeholder: "Enter Email",
              },
              {
                label: "Phone Number",
                ref: refs.phone_number,
                placeholder: "Enter Phone Number",
                error: errors.phone,
              },
              {
                label: "Date Of Birth",
                ref: refs.date_of_birth,
                placeholder: "Enter Date of Birth",
                error: errors.dob,
                type: "date",
              },
              {
                label: "State Of Origin",
                ref: refs.state_of_origin,
                placeholder: "Enter State Of Origin",
                error: errors.state,
              },
              {
                label: "Address",
                ref: refs.address,
                placeholder: "Enter Address",
                error: errors.address,
                type: "textarea",
              },
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col pr-3 mb-7">
                {" "}
                <label>{field.label}</label>{" "}
                {field.type === "textarea" ? (
                  <Textarea
                    ref={field.ref as any}
                    className="w-120 mt-3"
                    placeholder={field.placeholder}
                    rows={4}
                  />
                ) : field.type === "date" ? (
                  <Input
                    type="date"
                    ref={field.ref as any}
                    placeholder={field.placeholder}
                    className="w-120 mt-3"
                  />
                ) : (
                  <Input
                    ref={field.ref as any}
                    className="w-120 mt-3"
                    placeholder={field.placeholder}
                  />
                )}{" "}
                <ErrorText message={field.error} />{" "}
              </div>
            ))}

            {/* Gender */}
            <div className="flex flex-col pr-3 mb-7">
              <label>Gender</label>
              <Select onValueChange={setUserGender} value={userGender}>
                <SelectTrigger className="w-120 h-50 mt-3">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  {gender.map((g) => (
                    <SelectItem key={g} value={g} className="capitalize">
                      <span className="capitalize">{g}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorText message={errors.gender} />
            </div>

            {/* Classes */}
            {type === "student" && (
              <div className="mb-7">
                <label>Select Classes</label>
                <NativeSelect
                  className={`w-120 ${errors.studentClass ? "border-red-500" : ""}`}
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                >
                  <NativeSelectOption value="">Select Class</NativeSelectOption>

                  <NativeSelectOptGroup label="Creche">
                    {classes.creche?.map((c) => (
                      <NativeSelectOption key={c.id} value={c.id}>
                        {c.name}
                      </NativeSelectOption>
                    ))}
                  </NativeSelectOptGroup>

                  <NativeSelectOptGroup label="Primary">
                    {classes.primary?.map((c) => (
                      <NativeSelectOption key={c.id} value={c.id}>
                        {c.name}
                      </NativeSelectOption>
                    ))}
                  </NativeSelectOptGroup>

                  <NativeSelectOptGroup label="Secondary">
                    {[...(classes.jss || []), ...(classes.ss || [])].map(
                      (c) => (
                        <NativeSelectOption key={c.id} value={c.id}>
                          {c.name}
                        </NativeSelectOption>
                      ),
                    )}
                  </NativeSelectOptGroup>
                </NativeSelect>

                <ErrorText message={errors.studentClass} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- Parent ---------------- */}
      {type === "student" && (
        <div className="w-full bg-off-white gap-16 m-5 rounded-xl">
          <h2 className="bg-yellow-900 w-full p-3 font-mono font-bold text-2xl rounded-t-xl text-off-white">
            Parent Details
          </h2>

          <div className="w-full flex bg-yellow-50 p-5 flex-wrap gap-4">
            {[
              {
                label: "Parent First Name",
                ref: refs.parent_first_name,
                placeholder: "Enter First Name",
                error: errors.parentFirstName,
              },
              {
                label: "Parent Last Name",
                ref: refs.parent_last_name,
                placeholder: "Enter Last Name",
                error: errors.parentLastName,
              },
              {
                label: "Parent Email",
                ref: refs.parent_email,
                placeholder: "Enter Email",
                error: errors.parentEmail,
              },
              {
                label: "Parent Phone",
                ref: refs.parent_phone,
                placeholder: "Enter Phone",
                error: errors.parentPhone,
              },
              {
                label: "Parent Address",
                ref: refs.parent_address,
                placeholder: "Enter Address",
                error: errors.parentAddress,
                type: "textarea",
              },
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col pr-3 mb-7">
                {" "}
                <label>{field.label}</label>{" "}
                {field.type === "textarea" ? (
                  <Textarea
                    ref={field.ref as any}
                    className="w-150 mt-3"
                    placeholder={field.placeholder}
                  />
                ) : (
                  <Input
                    ref={field.ref as any}
                    className="w-150 mt-3"
                    placeholder={field.placeholder}
                  />
                )}{" "}
                <ErrorText message={field.error} />{" "}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- Teacher Education ---------------- */}
      {type === "teacher" && (
        <div className="w-full bg-off-white gap-16 m-5 rounded-xl">
          <h2 className="bg-yellow-900 w-full p-3 font-mono font-bold text-2xl rounded-t-xl text-off-white">
            Education
          </h2>

          <div className="w-full flex bg-yellow-50 p-5 flex-wrap gap-4">
            {/* Highest Education */}
            <div className="flex flex-col pr-3 mb-7">
              <label>Highest Education</label>
              <Select onValueChange={setQualification} value={qualification}>
                <SelectTrigger className="w-150 h-50 mt-3">
                  <SelectValue placeholder="Highest Education" />
                </SelectTrigger>
                <SelectContent>
                  {EduQualifications.map((item, idx) => (
                    <SelectItem key={idx} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorText message={errors.qualification} />
            </div>

            {/* Teacher fields */}
            {[
              {
                label: "Course",
                ref: refs.course,
                placeholder: "Enter Course",
                error: errors.course,
              },
              {
                label: "Reference Name",
                ref: refs.reference_name,
                placeholder: "Enter Reference Name",
                error: errors.reference_name,
              },
              {
                label: "Reference Phone",
                ref: refs.reference_phone,
                placeholder: "Enter Reference Phone",
                error: errors.reference_phone,
              },
              {
                label: "Reference Email",
                ref: refs.reference_email,
                placeholder: "Enter Reference Email",
                error: errors.reference_email,
              },
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col pr-3 mb-7">
                {" "}
                <label>{field.label}</label>
                <Input
                  ref={field.ref as any}
                  className="w-150 mt-3"
                  placeholder={field.placeholder}
                />
                <ErrorText message={field.error} />{" "}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- Submit ---------------- */}
      <Button
        variant="secondary"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="bg-yellow-900 text-off-white hover:bg-grey900 hover:text-beige100 h-12 w-50 hover:bg-yellow-700"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
};

export default UserForm;
