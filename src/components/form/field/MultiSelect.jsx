import React from 'react';
import PropTypes from 'prop-types';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const MultiSelect = ({ control, name, label, options, disabled }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-4 mt-1">
          <FormLabel className="text-md font-semibold text-gray-700">{label}</FormLabel>
          <FormControl>
            <Select disabled={disabled}>
              <SelectTrigger className="border border-gray-300 rounded-md p-2">
                <SelectValue placeholder="Select options" />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.label} value={option.value}>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={Array.isArray(field.value) && field.value.includes(option.value)}
                        onChange={() => {
                          const currentValues = Array.isArray(field.value) ? field.value : [];
                          const newSelectedValues = currentValues.includes(option.value)
                            ? currentValues.filter((val) => val !== option.value)
                            : [...currentValues, option.value];
                          field.onChange(newSelectedValues);
                          console.log("currentValues",currentValues)
                          console.log("newSelectedValues",newSelectedValues)
                        }}
                        disabled={disabled}
                        className="mr-2"
                      />
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  disabled: PropTypes.bool,
  control: PropTypes.object.isRequired, // control wajib disediakan dari Form context
};

MultiSelect.defaultProps = {
  disabled: false,
};

export default MultiSelect;
