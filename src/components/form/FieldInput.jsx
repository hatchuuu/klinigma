import React, { useState } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Eye, EyeClosed, EyeOff, EyeOffIcon } from 'lucide-react'


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
                        {/* <Input type="text" placeholder={label} {...field} /> */}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default FieldInput