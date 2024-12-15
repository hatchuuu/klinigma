import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import PropTypes from 'prop-types'

const FieldBirthDate = ({ control, name, label }) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="mb-3">
                    <FormLabel className="text-md font-semibold text-gray-700"> {label} </FormLabel>
                    <FormControl>
                        <Input
                            type="date"
                            placeholder="MM/DD/YYYY"
                            className="mt-1 block w-full p-2 border border-black-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            {...field}
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
    control: PropTypes.object
}
export default FieldBirthDate