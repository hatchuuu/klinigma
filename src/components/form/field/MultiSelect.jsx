import React from "react";
import PropTypes from "prop-types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

const MultiSelect = ({ control, name, label, options, disabled }) => {
  console.log("options", options);
  // console.log("onChange", onChange);
  const [selectedValues, setSelectedValues] = useState([]); // State for selected values

  const handleChange = (value) => {
    setSelectedValues((prev) => {
      if (prev.includes(value)) {
        // If already selected, remove the value
        return prev.filter((val) => val !== value);
      }
      // Otherwise, add the value
      return [...prev, value];
    });
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
            <div>
            {/* <Select>
              <SelectTrigger className="border border-gray-300 rounded-md p-2">
                <SelectValue placeholder="Select options" />
              </SelectTrigger>
              <SelectContent> */}
                {options.map((option) => (
                  // <SelectItem key={option.value}>
                    <div key={option.value}>
                    <div className="flex items-center">
                      <Checkbox
                        checked={field.value.includes(option.value)} // Check if value is selected
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...field.value, option.value] // Add value
                            : field.value.filter((val) => val !== option.value); // Remove value
                          field.onChange(newValue); // Update field value
                        }}
                        disabled={disabled}
                        className="mr-2"
                      />
                      <span>{option.label}</span>
                    </div>
                  {/* // </SelectItem> */}
                  </div>
                ))}
              {/* </SelectContent>
            </Select> */}
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
        .isRequired, // Support both string and number values
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  disabled: PropTypes.bool,
  control: PropTypes.object.isRequired, // control is required from form context
};

MultiSelect.defaultProps = {
  disabled: false,
  value: [],
};

export default MultiSelect;
