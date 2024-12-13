import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import loginInstance from '@/lib/axios'
import { useNavigate } from 'react-router-dom'
import { loginSchema } from '@/lib/zodSchema'
import FormComponents from '@/components/form/FormComponents'


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
        const response = await loginInstance("", {
            email, password
        })
        localStorage.setItem('token', response.data.data.token);
        navigate("/dashboard")
    })

    return (
        <>
            <Form {...form}>
                <form onSubmit={onSubmit}>
                    <FormComponents control={control} name="email" />
                    <FormComponents control={control} name="password" />
                    <Button type="submit">Login</Button>
                </form>
            </Form>
        </>
    )
}

export default LoginPage
