import { Input } from "@/components/ui/input";

const DatePicker = ({ control, name, label, type = "date" }) => {
  return (
    <div className="mt-2">
      <label htmlFor={name} className="block text-black-700 text-sm">{label}</label>
      <Input
        type={type}
        {...control.register(name)}
        id={name}
        placeholder="MM/DD/YYYY"
        className="mt-1 block w-full p-2 border border-black-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default DatePicker;
