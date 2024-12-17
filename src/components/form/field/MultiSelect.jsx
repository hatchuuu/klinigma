"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";
import { 
  DropdownMenu, 
  DropdownMenuCheckboxItem, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const FieldMultiSelect = ({ control, name, label, list = [], disabled }) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleCheckedChange = (checked, value) => {
    const newValue = checked
      ? [...selectedValues, value]
      : selectedValues.filter((val) => val !== value);

    setSelectedValues(newValue);

    // Pastikan `control` memiliki metode `setValue`
    if (control && typeof control.setValue === "function") {
      control.setValue(name, newValue); // Update form control value
      console.log(`[handleCheckedChange] Updated selected values:`, newValue);
    } else {
      console.warn("`control.setValue` is not defined or not a function.");
    }
  };

  console.log(`[Render] Current selected values:`, selectedValues);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-white hover:bg-white">{label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {list.map((item) => {
          const isChecked = selectedValues.includes(item.value);
          console.log(`[Render] Item: ${item.label}, Checked: ${isChecked}`);
          return (
            <DropdownMenuCheckboxItem
              key={item.value}
              checked={isChecked}
              onCheckedChange={(checked) => handleCheckedChange(checked, item.value)}
              disabled={disabled}
            >
              {item.label}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

FieldMultiSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  control: PropTypes.shape({
    setValue: PropTypes.func, // Optional jika tidak digunakan
  }),
  disabled: PropTypes.bool,
};

export default FieldMultiSelect;
