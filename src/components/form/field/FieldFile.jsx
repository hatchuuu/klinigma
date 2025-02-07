import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Image } from 'lucide-react'
import PropTypes from 'prop-types'
import { useRef, useState } from 'react'

const FieldFile = ({ control, name, label, disabled = false }) => {
    const [filePreview, setFilePreview] = useState(null);
    const fileRef = useRef();

    const handleChange = (e, onChange) => {
        const file = e.target.files[0];
        setFilePreview(file ? URL.createObjectURL(file) : null);
        onChange(file);
    };

    const handleClick = () => {
        fileRef.current.click();
    };

    const previewComponent = (filePreview, handleClick, value) => {
        return (
            <div
                className="w-full aspect-square flex flex-col gap-4 justify-center items-center border-border border-2 rounded-xl cursor-pointer bg-white"
                onClick={handleClick}
            >
                {(filePreview && value) ? (
                    <img src={filePreview} alt="Preview" className="w-full h-full object-contain rounded-xl" />
                ) : (
                    <Image size={32} />
                )}
                <p>{value?.name ?? `Masukkan ${label}`}</p>
            </div>
        )
    }

    return (
        <FormField
            control={control}
            name={name}
            render={({ field: { onChange, value, ref } }) => (
                <FormItem className="mb-5">
                    <FormLabel className="ps-3 text-xl font-semibold text-gray-800">{label}</FormLabel>
                    <FormControl>
                        <>
                            {previewComponent(filePreview, handleClick, value)}
                            <Input
                                type="file"
                                className="hidden"
                                ref={(e) => {
                                    ref(e);
                                    fileRef.current = e; // Referensikan input
                                }}
                                onChange={(e) => handleChange(e, onChange)} // Handle perubahan
                                disabled={disabled}
                            />
                        </>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};


FieldFile.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    canHide: PropTypes.bool,
    disabled: PropTypes.bool,
    control: PropTypes.object
}
export default FieldFile