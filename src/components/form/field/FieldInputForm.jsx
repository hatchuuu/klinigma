import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import PropTypes from 'prop-types';
import { Textarea } from '@/components/ui/textarea';

const FieldInputForm = ({ control, name, label, disabled, isTextarea, type }) => {
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
                                    className={`relative w-full border border-gray-400 focus:outline-none resize-none ${
                                        disabled ? 'bg-gray-200 cursor-not-allowed' : ''
                                    }`}
                                    disabled={disabled}
                                    rows={4} // Default height untuk textarea
                                    {...field}
                                />
                            ) : (
                                <Input
                                    className={`relative border border-gray-400 focus:outline-none ${
                                        disabled ? 'bg-gray-200 cursor-not-allowed' : ''
                                    }`}
                                    type={type}
                                    disabled={disabled}
                                    {...field}
                                />
                            )}
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

FieldInputForm.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    control: PropTypes.object,
    disabled: PropTypes.bool,
    isTextarea: PropTypes.bool,
    type: PropTypes.string, // Menambahkan prop untuk tipe input
};

FieldInputForm.defaultProps = {
    type: 'text', // Default tipe adalah text
};

export default FieldInputForm;
