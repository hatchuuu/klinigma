import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import PropTypes from 'prop-types'

const FieldBirthDate = ({ control, name, label, disabled = false }) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="mb-5">
                    <FormLabel className="ps-3 text-xl font-semibold text-gray-800">{label}</FormLabel>
                    {/* <FormDescription className="ps-3 text-sm text-gray-500">Format tanggal: Bulan/Tanggal/Tahun</FormDescription> */}
                    <FormControl>
                        <Input
                            type="date"
                            placeholder="MM/DD/YYYY"
                            {...field}
                            disabled={disabled}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
FieldBirthDate.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    canHide: PropTypes.bool,
    disabled: PropTypes.bool,
    control: PropTypes.object
}
export default FieldBirthDate