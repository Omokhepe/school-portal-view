import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

export type MultiSelectOption = {
  label: string;
  value: string;
};

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  placeholder?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select options",
}) => {
  const [open, setOpen] = React.useState(false);

  const toggleOption = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  const selectedLabels = options
    .filter((opt) => value.includes(opt.value))
    .map((opt) => opt.label)
    .join(", ");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {selectedLabels || placeholder}
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>

            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  onSelect={() => toggleOption(opt.value)}
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                      value.includes(opt.value)
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50",
                    )}
                  >
                    {value.includes(opt.value) && <Check className="h-3 w-3" />}
                  </div>
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelect;
