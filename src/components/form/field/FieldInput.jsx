import { useState } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";


const FieldInput = ({ control, name, label, type = "text", disabled }) => {

    const [visible, setVisible] = useState(type !== "password")

    const setTypeInput = (field) => {
        return (
            <Input
                className={` ${!visible && "pr-12"} relative peer placeholder:text-base`}
                type={visible ? type : "password"}
                disabled={disabled}
                placeholder={`Masukkan ${label} anda`}
                {...field}
            />
        )
    }

    const setEye = () => {
        return (
            <div
                onClick={() => setVisible((prev) => !prev)}
                className={`${type !== "password" && "hidden"} transition-all absolute z-10 right-4 bottom-[10px] peer-hover:bottom-[7.5px] peer-hover:right-[10px] peer-focus-visible:bottom-[7.5px] peer-focus-visible:right-[10px]`}
            >
                {visible ? <HiOutlineEye size={20} /> : <HiOutlineEyeOff size={20} />}
            </div>
        )
    }
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="mb-5">
                    <FormLabel className="ps-3 text-xl font-semibold text-gray-800">{label}</FormLabel>
                    <FormControl>
                        <div className="relative">
                            {setTypeInput(field)}
                            {setEye()}
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default FieldInput;
