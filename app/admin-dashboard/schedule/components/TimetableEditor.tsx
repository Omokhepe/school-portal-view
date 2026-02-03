"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@store/authStore";
import { TimetableEntry } from "../../../../types/timetable";
import { addSchedule } from "@actions/timetable";
import { apiFetch, formatDate, normalizeTime } from "@lib/helper";
import { toast } from "sonner";
import { SubjectType, UserType } from "../../../../types/user";
import axios from "axios";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  entry?: TimetableEntry | null;
  classId: string;
  subjects: SubjectType[];
  teachers: UserType[];
  onSaved: () => void;
};

const defaultState = {
  day: "monday",
  start: "08:00",
  end: "08:40",
  subjectId: 0,
  teacherId: 0,
};

const TimetableEditor = ({
  open,
  onOpenChange,
  entry,
  classId,
  subjects,
  teachers,
  onSaved,
}: Props) => {
  const token = useAuthStore((s) => s.token);

  const [form, setForm] = useState(defaultState);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  console.log(entry, "checking this");

  // helper updater
  const update = (field: string, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const resetForm = useCallback(() => {
    if (entry) {
      const { day, start_time, end_time, subject_id, teacher_id } = entry.data;
      setForm({
        day: day,
        start: start_time,
        end: end_time,
        subjectId: subject_id,
        teacherId: teacher_id ?? 0,
      });
    } else {
      setForm(defaultState);
    }
    setError(null);
  }, [entry]);

  useEffect(() => {
    if (open) resetForm();
  }, [open, resetForm]);

  const validate = () => {
    if (!form.subjectId) return "Select subject";
    if (!form.start || !form.end) return "Start and end required";
    return null;
  };

  const save = async () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      class_id: Number(classId),
      subject_id: Number(form.subjectId),
      teacher_id: form.teacherId ? Number(form.teacherId) : null,
      day: form.day,
      start_time: normalizeTime(form.start),
      end_time: normalizeTime(form.end),
    };

    console.log("payload", payload);

    try {
      if (entry?.data.id) {
        // await apiFetch(`/timetable/${entry.data.id}`, token, {
        //   method: "PUT",
        //   body: JSON.stringify(payload),
        // });
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/timetable/${entry.data.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          },
        );
        console.log(res, "here rese to see it goes");
      } else {
        await addSchedule(token, payload);
      }

      toast.success("Timetable saved");
      onSaved();
      onOpenChange(false);
    } catch (err: any) {
      const msg = err?.error ?? err?.data?.message ?? "Save failed";
      toast.error(`Failed to save schedule: ${msg} ${err}`);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    if (!entry?.data.id) return;
    setLoading(true);

    try {
      // await apiFetch(`/timetable/${entry.id}`, token, { method: "DELETE" });
      onSaved();
      onOpenChange(false);
    } catch {
      setError("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {entry?.type === "entry" ? "Edit slot" : "Add slot"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {/* Day */}
          <div>
            <label className="block text-sm">Day</label>
            <select
              className="w-full border p-2"
              value={form.day}
              onChange={(e) => update("day", e.target.value)}
            >
              {["monday", "tuesday", "wednesday", "thursday", "friday"].map(
                (d) => (
                  <option key={d} value={d}>
                    {d.charAt(0).toUpperCase() + d.slice(1)}
                  </option>
                ),
              )}
            </select>
          </div>

          {/* Times */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm">Start</label>
              <input
                type="time"
                className="w-full border p-2"
                value={form.start}
                onChange={(e) => update("start", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm">End</label>
              <input
                type="time"
                className="w-full border p-2"
                value={form.end}
                onChange={(e) => update("end", e.target.value)}
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm">Subject</label>
            <select
              className="w-full border p-2"
              value={form.subjectId}
              onChange={(e) => update("subjectId", e.target.value)}
            >
              <option value="">Select subject</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Teacher */}
          <div>
            <label className="block text-sm">Teacher (optional)</label>
            <select
              className="w-full border p-2"
              value={form.teacherId}
              onChange={(e) => update("teacherId", e.target.value)}
            >
              <option value="">Auto / None</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.first_name} {t.last_name}
                </option>
              ))}
            </select>
          </div>

          {/* Error */}
          {error && <div className="text-red-600 text-sm">{error}</div>}

          {/* Actions */}
          <div className="flex gap-2 justify-end">
            {entry?.data.id && (
              <Button variant="destructive" onClick={remove} disabled={loading}>
                Delete
              </Button>
            )}

            <Button onClick={save} disabled={loading}>
              {entry?.data.id ? "Update" : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimetableEditor;
