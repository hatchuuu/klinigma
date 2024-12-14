import { useState } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import PropTypes from 'prop-types'


const FieldInput = ({ control, name, label, canHide }) => {
    const [visible, setVisible] = useState(!canHide)
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel> {label} </FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input
                                className="relative"
                                type={visible ? "text" : "password"}
                                {...field}
                            />
                            <div
                                onClick={() => setVisible((prev) => !prev)}
                                className={` ${!canHide && "hidden"} absolute z-10 right-2 bottom-1`}
                            >
                                {visible ? <Eye /> : <EyeOff />}
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
    control: PropTypes.object
}
export default FieldInput