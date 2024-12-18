import { useState } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import PropTypes from 'prop-types'


const FieldInput = ({ control, name, label, canHide, disabled }) => {
    const [visible, setVisible] = useState(!canHide)
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="mb-3">
                    <FormLabel className="text-md font-semibold text-gray-700"> {label} </FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input
                                className={` ${!visible && "pe-9"} relative border border-gray-400 focus:outline-none`}
                                type={visible ? "text" : "password"}
                                {...field}
                                disabled={disabled}
                            />
                            <div
                                onClick={() => setVisible((prev) => !prev)}
                                className={` ${!canHide && "hidden"} absolute z-10 right-3 bottom-[8px]`}
                            >
                                {visible ? <Eye size={12} /> : <EyeOff size={12} />}
                            </div>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

FieldInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    canHide: PropTypes.bool,
    control: PropTypes.object,
    disabled: PropTypes.bool,
    isTextarea: PropTypes.bool,
    type: PropTypes.string, // Menambahkan prop untuk tipe input
};

// FieldInput.defaultProps = {
//     type: 'text', // Default tipe adalah text
// };

export default FieldInput;
