import { useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import PropTypes from 'prop-types';
import { Textarea } from '@/components/ui/textarea';

const FieldInput = ({ control, name, label, canHide, disabled, isTextarea, type = "text" }) => {
    const [visible, setVisible] = useState(!canHide);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="mb-3">
                    <FormLabel className="text-md font-semibold text-gray-700">{label}</FormLabel>
                    <FormControl>
                        <div className="relative">
                            {isTextarea ? (
                                <Textarea
                                    className={`relative w-full border border-gray-400 focus:outline-none resize-none ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''
                                        }`}
                                    disabled={disabled}
                                    rows={4} // Default height untuk textarea
                                    {...field}
                                />
                            ) : (
                                <>
                                    <Input
                                        className={`${type !== 'password' && 'pe-9'
                                            } relative border border-gray-400 focus:outline-none ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''
                                            }`}
                                        type={type === 'password' && !visible ? 'password' : type}
                                        disabled={disabled}
                                        {...field}
                                    />
                                    {type === 'password' && canHide && (
                                        <div
                                            onClick={() => !disabled && setVisible((prev) => !prev)}
                                            className={`absolute z-10 right-3 bottom-[8px] ${disabled ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer'
                                                }`}
                                        >
                                            {visible ? <Eye size={12} /> : <EyeOff size={12} />}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

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
