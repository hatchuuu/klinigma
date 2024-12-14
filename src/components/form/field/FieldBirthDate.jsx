
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from '../ui/label';
import PropTypes from 'prop-types';

const FieldBirthDate = ({ control, name, label }) => {

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <InputOTP maxLength={8} {...field}>
                            <div className="flex flex-col">
                                <Label>Tanggal</Label>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                </InputOTPGroup>
                            </div>
                            <InputOTPSeparator />
                            <div className="flex flex-col">
                                <Label>Bulan</Label>
                                <InputOTPGroup>
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                </InputOTPGroup>
                            </div>
                            <InputOTPSeparator />
                            <div className="flex flex-col">
                                <Label>Tahun</Label>
                                <InputOTPGroup>
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                    <InputOTPSlot index={6} />
                                    <InputOTPSlot index={7} />
                                </InputOTPGroup>
                            </div>
                        </InputOTP>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

FieldBirthDate.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    control: PropTypes.object
}

export default FieldBirthDate
