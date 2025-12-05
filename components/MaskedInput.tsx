"use client";

import React, { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeOff } from "lucide-react";
type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const MaskedInput = ({ value, onChange, placeholder }: Props) => {
  const [show, setShow] = useState(false);

  const displayValue = show ? value : "•".repeat(value.length);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;

    if (show) {
      onChange(newVal);
      return;
    }

    // Masked typing logic
    if (newVal.length > value.length) {
      const lastChar = newVal[newVal.length - 1];
      onChange(value + lastChar);
    } else if (newVal.length < value.length) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div>
      <InputGroup>
        <InputGroupInput
          type="text"
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="placeholder:text-off-white text-white"
          autoComplete="new-password"
        />
        <InputGroupAddon align="inline-end" onClick={() => setShow(!show)}>
          {show ? (
            <Eye className="text-white" />
          ) : (
            <EyeOff className="text-white" />
          )}
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default MaskedInput;
