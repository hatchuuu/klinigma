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

// const FieldSelect = ({ control, name, label, list }) => {
//     return (
//         <FormField
//             control={control}
//             name={name}
//             render={({ field }) => (
//                 <FormItem className="mb-4 mt-1">
//                     <FormLabel className="text-md font-semibold text-gray-700"> {label} </FormLabel>
//                     <Select onValueChange={field.onChange} defaultValue={field.value}>
//                         <FormControl>
//                             <SelectTrigger className="border border-gray-400 focus:outline-none" >
//                                 <SelectValue placeholder={`Pilih ${label}`} />
//                             </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                             {
//                                 list.map((value, index) => {
//                                     return (
//                                         <SelectItem key={index} value={value}><p className="capitalize">{value}</p></SelectItem>
//                                     )
//                                 })
//                             }
//                         </SelectContent>
//                     </Select>
//                     <FormMessage />
//                 </FormItem>
//             )}
//         />
//     )
// }

const FieldSelect = ({ control, name, label, list, disabled ,onValueChange}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="mb-4 mt-1">
        <FormLabel className="text-md font-semibold text-gray-700">
          {label}
        </FormLabel>
        <Select
          // onValueChange={(value) => field.onChange(value)} // Handle perubahan nilai
          // onValueChange={(value) => {
          //   field.onChange(value); 
          //   if (onValueChange) {
          //     onValueChange(value); 
          //   }
          // }}
          onValueChange={(value) => {
            const selectedItem = list.find(item => item.value === value); // Find the selected item
            field.onChange(value); // Update the form state
            if (onValueChange && selectedItem) {
              onValueChange(selectedItem); // Call the onValueChange prop with the entire item
            }
          }}
          value={field.value || ""} // Sinkronisasi nilai dengan form state
          disabled={disabled}
        >
          <FormControl>
            <SelectTrigger className="border border-gray-400 focus:outline-none">
              <SelectValue placeholder={`Pilih ${label}`} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {list.map((item, index) => (
              <SelectItem key={item.id} value={item.value}>
                <p className="capitalize">{item.value}</p>
              </SelectItem>
            ))}
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
