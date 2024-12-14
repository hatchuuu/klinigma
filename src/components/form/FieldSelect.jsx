import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const FieldSelect = ({ control, name, label, list }) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={`Pilih ${label}`} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {
                                list.map((value, index) => {
                                    return (
                                        <SelectItem key={index} value={value}><p className="capitalize">{value}</p></SelectItem>
                                    )
                                })
                            }
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default FieldSelect