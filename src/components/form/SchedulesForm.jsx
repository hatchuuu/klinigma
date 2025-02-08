import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { scheduleSchema } from '@/lib/zodSchema'
import { Form } from '../ui/form'
import FieldInput from './field/FieldInput'
import FieldSelect from './field/FieldSelect'
import { X } from 'lucide-react'
import { failedToast, successToast } from '@/lib/toaster'
import { createSchedules } from '@/api/schedule'
import { useNotif, useRefreshSchedules } from '@/store/store'
import { jwtDecode } from 'jwt-decode'

const SchedulesForm = ({ data, setIsOpen, doctorId }) => {

    const token = sessionStorage.getItem("token")
    const { polyId: polyclinicId } = jwtDecode(token)

    const refreshSchedules = useRefreshSchedules((state) => state.setRefresh)
    const addNotif = useNotif((state) => state.addNotif)
    const form = useForm({
        defaultValues: {
            schedules: data && data.length > 0 ? data : [{
                day: "",
                startTime: "",
                endTime: "",
                quota: 0,
            }]
        },
        resolver: zodResolver(scheduleSchema)
    })

    const dayList = [
        { label: "Senin", value: "senin" },
        { label: "Selasa", value: "selasa" },
        { label: "Rabu", value: "rabu" },
        { label: "Kamis", value: "kamis" },
        { label: "Jumat", value: "jumat" },
        { label: "Sabtu", value: "sabtu" },
        { label: "Minggu", value: "minggu" },
    ]
    const { control, handleSubmit } = form

    const { fields, append, remove } = useFieldArray({
        name: "schedules",
        control
    })

    const onSubmit = handleSubmit(async (values) => {
        if (values.schedules.length == 0) return
        try {
            await createSchedules(values.schedules, doctorId, polyclinicId);
            successToast("Jadwal berhasil ditambahkan");
            refreshSchedules();
            addNotif({
                title: "Jadwal Ditambahkan",
                message: "Jadwal dokter berhasil ditambahkan",
            })

        } catch (error) {
            failedToast("Jadwal gagal ditambahkan");
        }
        finally {
            setIsOpen(false)
        }
    })

    return (
        <Form {...form}>
            <form onSubmit={onSubmit}>
                {fields.map((item, i) => (
                    <div
                        className="flex w-full gap-5 items-center"
                        key={item.id}
                    >
                        <div className='max-w-64'>
                            <FieldSelect className="" name={`schedules.${i}.day`} control={control} label='Hari' list={dayList} />
                        </div>
                        <div className='max-w-64'>
                            <FieldInput className="" name={`schedules.${i}.startTime`} type="time" control={control} label='Jam Mulai' />
                        </div>
                        <div className='max-w-64'>
                            <FieldInput className="" name={`schedules.${i}.endTime`} type="time" control={control} label='Jam Selesai' />
                        </div>
                        <div className='min-w-5 max-w-64'>
                            <FieldInput name={`schedules.${i}.quota`} control={control} label='Kuota' />
                        </div>
                        <Button
                            variant="noShadow"
                            className=" border-none p-0 h-10 w-10"
                            onClick={() => remove(i)}
                            disabled={fields.length === 1}
                        >
                            <X width={20} />
                        </Button>
                    </div>
                ))}
                <Button onClick={() => append({ day: "", startTime: "", endTime: "", quota: 0 })}>Tambah</Button>
                <Button type="submit">Kirim</Button>
                <Button onClick={() => setIsOpen(false)}>Kembali</Button>
            </form>
        </Form>
    )
}

export default SchedulesForm
