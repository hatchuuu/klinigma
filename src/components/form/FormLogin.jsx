import React from 'react'
import FormComponents from './FormComponents'

const FormLogin = () => {
    return (
        <Form {...form}>
            <form>
                <FormComponents control={control} name="email" />
                <FormComponents control={control} name="password" />
                <Button type="submit">
                    Login
                </Button>
            </form>
        </Form >
    )
}

export default FormLogin