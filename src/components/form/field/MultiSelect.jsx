import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormDescription,
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
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">{label}</FormLabel>
            <FormDescription>
              Select the items you want to display in the sidebar.
            </FormDescription>
          </div>
          {options.map((item) => (
            <FormField
              key={item.id}
              control={control}
              name={name}
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.id])
                            : field.onChange(
                              field.value?.filter(
                                (value) => value !== item.id
                              )
                            )
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      {item.label}
                    </FormLabel>
                  </FormItem>
                )
              }}
            />
          ))}
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
