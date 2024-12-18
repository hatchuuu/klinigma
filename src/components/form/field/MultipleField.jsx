"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
const CheckboxGroup = ({
  options,
  selectedValues = [],
  onSelect,
  control,
  name,
  label,
}) => {
  const [selectedIds, setSelectedIds] = useState(selectedValues);

  const handleSelect = (id) => {
    const updatedSelections = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id) // Remove if selected
      : [...selectedIds, id]; // Add if not selected

    setSelectedIds(updatedSelections);
    onSelect(updatedSelections); // Notify parent of changes
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-4 mt-1">
          <FormLabel className="text-md font-semibold text-gray-700">
            {label}
          </FormLabel>
          <FormControl>
            <div className="w-full max-w-md mx-auto mt-5">
              <div className="border border-gray-300 rounded-md p-2">
                {options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <input
                      type="checkbox"
                      id={`option-${option.value}`}
                      checked={selectedIds.includes(option.value)}
                      onChange={() => handleSelect(option.value)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <label
                      htmlFor={`option-${option.value}`}
                      className="text-gray-700"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600 font-semibold">
                  Selected IDs:
                </p>
                <div className="bg-gray-100 border rounded p-2">
                  {selectedIds.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedIds.map((id) => (
                        <span
                          key={id}
                          className="inline-block bg-blue-500 text-white px-2 py-1 rounded text-sm"
                        >
                          ID: {id}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm">
                      No options selected
                    </span>
                  )}
                </div>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

CheckboxGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedValues: PropTypes.arrayOf(PropTypes.number),
  onSelect: PropTypes.func,
};

CheckboxGroup.defaultProps = {
  selectedValues: [],
  onSelect: () => {},
};

export default CheckboxGroup;
