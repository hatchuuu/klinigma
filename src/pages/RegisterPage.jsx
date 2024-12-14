import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { registerSchema } from '@/lib/zodSchema'
import FieldInput from '@/components/form/FieldInput'
import FieldSelect from '@/components/form/FieldSelect'
import FieldDate from '@/components/form/FieldDate'
import { createUser } from '@/data/createUser'
import { failedToast, successToast } from '@/lib/toaster'
import BirthDatePicker from '@/components/BirthDatePicker'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import FieldBirthDate from '@/components/form/FieldBirthDate'

const RegisterPage = () => {
    const list = ["wanita", "pria"]
    // const [birthDate, setBirthDate] = useState(Array(3))
    // const navigate = useNavigate()
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            location: "",
            phoneNumber: 0,
            gender: "",
            role: "user",
            birthDate: ""
        },
        resolver: zodResolver(registerSchema)
    })
    const { control, handleSubmit } = form

    const onSubmit = handleSubmit(async (value) => {
        const response = await createUser(value)
        if (response.status == 201) {
            successToast(response.message)
        } else {
            failedToast(response.message)
        }
    })

    return (
        <div className="mb-64">
            <Form {...form}>
                <form onSubmit={onSubmit}>
                    <FieldInput control={control} name="name" label="Nama" />
                    <FieldInput control={control} name="email" label="Email" />
                    <FieldInput control={control} name="password" label="Password" canHide={true} />
                    <FieldInput control={control} name="confirmPassword" label="Konfirmasi Password" canHide={true} />
                    <FieldInput control={control} name="location" label="Kota" />
                    <FieldInput control={control} name="phoneNumber" label="Nomor Telepon" />
                    <FieldSelect control={control} name="gender" label="Jenis Kelamin" list={list} />
                    <FieldBirthDate control={control} name="birthDate" label="Tanggal Lahir" />
                    <Button type="submit">Register</Button>
                </form>
            </Form>
            <Link to="/login">
                <Button variant="link">Kembali ke Login</Button>
            </Link>
        </div>
    )
}

export default RegisterPage
