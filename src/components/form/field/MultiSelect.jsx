import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

const MultiSelect = ({ control, name, label, options, disabled = false }) => {

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
            <div className="flex flex-row flex-wrap gap-x-4  gap-y-2">
              {options.map((option) => (
                <div key={option.value}>
                  <div className="flex items-center">
                    <Checkbox
                      checked={field.value.includes(option.value)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...field.value, option.value]
                          : field.value.filter((val) => val !== option.value);
                        field.onChange(newValue);
                      }}
                      disabled={disabled}
                      className="mr-2"
                    />
                    <span>{option.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

MultiSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  disabled: PropTypes.bool,
  control: PropTypes.object.isRequired, // control is required from form context
};


export default MultiSelect;
