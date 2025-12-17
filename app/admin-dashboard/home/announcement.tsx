import React, { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  deleteAnnouncement,
  editAnnouncement,
  fetchActiveAnnouncements,
  postAnnouncement,
} from "@actions/announcement";
import { useAnnouncement } from "@store/announcement";
import { formatDate } from "@lib/helper";
import PopoverMenu from "@components/PopoverMenu";
import { useAuthStore } from "@store/authStore";
import { toast } from "sonner";
import { AnnouncementType } from "../../../types/timetable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DeleteModal from "@components/DeleteModal";

const Announcement: React.FC = () => {
  const token = useAuthStore((s) => s.token);
  const active = useAnnouncement((s) => s.active);
  const [selectedData, setSelectedData] = useState<AnnouncementType | null>(
    null,
  );
  const [selectedStatus, setSelectedStatus] = useState("");
  const [buttonType, setButtonType] = useState("");

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [form, setForm] = useState({
    subject: "",
    message: "",
    start_date: "",
    end_date: "",
  });

  const statusActive =
    selectedStatus === ""
      ? active
      : active?.filter((item) => item.status === selectedStatus);

  useEffect(() => {
    fetchActiveAnnouncements();
  }, []);

  useEffect(() => {
    if (!selectedData) return;

    console.log(selectedData);

    setForm({
      subject: selectedData.subject,
      message: selectedData.message,
      start_date: selectedData.start_date.split("T")[0],
      end_date: selectedData.end_date.split("T")[0],
    });
  }, [selectedData]);

  const handleAddAnnouncement = async (e: any) => {
    e.preventDefault();

    if (!form.subject || !form.message || !form.start_date || !form.end_date) {
      toast.error("All fields are required");
      return;
    }

    const payload = {
      subject: form.subject,
      message: form.message,
      start_date: form.start_date,
      end_date: form.end_date,
    };

    try {
      if (buttonType === "add") {
        await postAnnouncement(payload, token);
        toast.success("Announcement successfully added");
      }
      if (buttonType === "edit") {
        if (!selectedData) return;
        await editAnnouncement(payload, selectedData.id, token);
        toast.success("Announcement Updated successfully");
      }
      if (buttonType === "delete") {
        if (!selectedData) return;
        await deleteAnnouncement(selectedData.id, token);
        toast.success("Announcement Deleted successfully");
      }

      reset();
    } catch (err: any) {
      console.log(err);
      toast.error(err.message || "Something went wrong");
    }
  };

  const reset = () => {
    setForm({
      subject: "",
      message: "",
      start_date: "",
      end_date: "",
    });
    setButtonType("");
    setOpen(false);
    setOpenDelete(false);
  };

  return (
    <div
      className={`${open ? "min-h-70" : "h-90"} bg-off-white w-100 rounded-lg shadow-md overflow-y-auto  px-5 pb-5 mt-6 `}
    >
      <div className="flex justify-between items-center font-bold sticky top-0 bg-off-white py-5 z-20">
        <h3>Announcement</h3>
        {open ? (
          <X onClick={reset} />
        ) : (
          <Plus
            onClick={() => {
              setOpen(true);
              setButtonType("add");
            }}
          />
        )}
      </div>
      {open ? (
        <form action="submit">
          <div>
            <Input
              type="text"
              name="subject"
              value={form.subject}
              onChange={(e) => {
                setForm({ ...form, subject: e.target.value });
              }}
              placeholder="Subject"
            />
            <Textarea
              placeholder="Message"
              value={form.message}
              className="my-5"
              onChange={(e) => {
                setForm({ ...form, message: e.target.value });
              }}
            />
            <div className="flex justify-end items-center gap-4">
              <div>
                <label htmlFor="">Start Date</label>
                <Input
                  type="date"
                  value={form.start_date}
                  onChange={(e) => {
                    setForm({ ...form, start_date: e.target.value });
                  }}
                />
              </div>
              <div>
                <label htmlFor="">End Date</label>
                <Input
                  type="date"
                  value={form.end_date}
                  onChange={(e) => {
                    setForm({ ...form, end_date: e.target.value });
                  }}
                />
              </div>
            </div>

            <Button
              className="mt-3 w-30 bg-yellow-900"
              onClick={handleAddAnnouncement}
            >
              {buttonType === "edit" ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex gap-5 items-center justify-end sticky top-[58px] bg-off-white py-2 z-10">
            <label htmlFor="statusFilter" className="text-sm">
              Filter
            </label>
            <Select
              onValueChange={setSelectedStatus}
              defaultValue={selectedStatus}
            >
              <SelectTrigger className="w-25 h-50" id="statusFilter">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="almost_up">Almost Up</SelectItem>
                {/*<SelectItem value="active">Active</SelectItem>*/}
              </SelectContent>
            </Select>
          </div>
          {statusActive?.map((announcement, index) => (
            <div key={index} className="card_wrap">
              <div className="flex justify-between">
                <h2 className="font-bold font-manrope text-sm">
                  {announcement.subject}{" "}
                  <span className="capitalize text-xs font-normal text-greyGreen">
                    ({announcement.status})
                  </span>
                </h2>

                <PopoverMenu
                  onEdit={() => {
                    setSelectedData(announcement);
                    setButtonType("edit");
                    setOpen(true);
                  }}
                  onDelete={() => {
                    setSelectedData(announcement);
                    setButtonType("delete");
                    setOpenDelete(true);
                  }}
                />
              </div>
              <p className="text-xs text-gray-600">
                {formatDate(announcement.start_date)}-
                {formatDate(announcement.end_date)}
              </p>
              <p className="text-sm pt-2 truncate">{announcement.message}</p>
            </div>
          ))}
        </>
      )}

      <DeleteModal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        initialValues={
          selectedData
            ? {
                subject: selectedData.subject,
                id: selectedData.id,
              }
            : { subject: "", id: "" }
        }
        onConfirm={(e) => handleAddAnnouncement(e)}
      />
    </div>
  );
};

export default Announcement;
