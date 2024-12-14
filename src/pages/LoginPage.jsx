import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { loginInstance } from '@/lib/axios'
import { Link, useNavigate } from 'react-router-dom'
import { loginSchema } from '@/lib/zodSchema'
import FormComponents from '@/components/form/FieldInput'

const LoginPage = () => {
    const navigate = useNavigate()
    const form = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: zodResolver(loginSchema)
    })
    const { control, handleSubmit } = form

    const onSubmit = handleSubmit(async (value) => {
        const { email, password } = value
        try {
            const response = await loginInstance("", {
                email, password
            })
            localStorage.setItem('token', response.data.data.token);
            navigate("/dashboard")
        } catch (error) {
            console.log(error)
        }
    })

    return (
        <div>
            <Form {...form}>
                <form onSubmit={onSubmit}>
                    <FormComponents control={control} name="email" label="Email" />
                    <FormComponents control={control} name="password" label="Password" canHide={true} />

                    {/* Fitur Lupa Password belum ada */}
                    <Link to="/reset-password">
                        <Button variant="link">Lupa Password</Button>
                    </Link>
                    <Button type="submit">Login</Button>
                </form>
            </Form>
            <Link to="/register">Belum Memiliki Akun?
                <Button variant="link"> Ayo Daftar</Button>
            </Link>
        </div>
    )
}

export default LoginPage
