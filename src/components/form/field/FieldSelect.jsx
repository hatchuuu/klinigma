import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PropTypes from "prop-types";

const FieldSelect = ({ control, name, label, list }) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="mb-3">
        <FormLabel className="ps-3 text-xl font-semibold text-gray-800">{label}</FormLabel>
        <Select onValueChange={field.onChange} value={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={`Pilih ${label}`} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {
              list.map((item, i) => (
                <SelectItem key={i} value={item.value}>
                  {item.label}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);

FieldSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  list: PropTypes.array,
  control: PropTypes.object,
  disabled: PropTypes.bool,
  onValueChange: PropTypes.func,
};

export default FieldSelect;
