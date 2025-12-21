import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";

interface Props {
  onEdit?: () => void;
  onDelete?: () => void;
}

const PopoverMenu = ({ onEdit, onDelete }: Props) => {
  return (
    <Popover>
      <PopoverTrigger>
        {/*<Button variant="ghost" size="icon">*/}
        <EllipsisVertical className="hover:scale-105 cursor-pointer hover:shadow-lg duration-200 w-6" />
        {/*</Button>*/}
      </PopoverTrigger>
      <PopoverContent className="w-40 p-2">
        <div className="flex flex-col space-y-1">
          <Button variant="ghost" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="ghost" className="text-red-600" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverMenu;
