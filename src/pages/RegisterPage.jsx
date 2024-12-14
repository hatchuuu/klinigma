import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "@/lib/zodSchema";
import FieldInput from "@/components/form/FieldInput";
import FieldSelect from "@/components/form/FieldSelect";
import DatePicker from "@/components/form/DatePicker";
import { createUser } from "@/data/createUser";
import { failedToast, successToast } from "@/lib/toaster";
import BirthDatePicker from "@/components/BirthDatePicker";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import FieldBirthDate from "@/components/form/FieldBirthDate";

const RegisterPage = () => {
  const list = ["wanita", "pria"];
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
      birthDate: "",
    },
    resolver: zodResolver(registerSchema),
  });
  const { control, handleSubmit } = form;

  const onSubmit = handleSubmit(async (value) => {
    const response = await createUser(value);
    if (response.status == 201) {
      successToast(response.message);
    } else {
      failedToast(response.message);
    }
  });

  return (
    // <div className="mb-64">
    //     <Form {...form}>
    //         <form onSubmit={onSubmit}>
    //             <FieldInput control={control} name="name" label="Nama" />
    //             <FieldInput control={control} name="email" label="Email" />
    //             <FieldInput control={control} name="password" label="Password" canHide={true} />
    //             <FieldInput control={control} name="confirmPassword" label="Konfirmasi Password" canHide={true} />
    //             <FieldInput control={control} name="location" label="Kota" />
    //             <FieldInput control={control} name="phoneNumber" label="Nomor Telepon" />
    //             <FieldSelect control={control} name="gender" label="Jenis Kelamin" list={list} />
    //             <FieldBirthDate control={control} name="birthDate" label="Tanggal Lahir" />
    //             <Button type="submit">Register</Button>
    //         </form>
    //     </Form>
    //     <Link to="/login">
    //         <Button variant="link">Kembali ke Login</Button>
    //     </Link>
    // </div>

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/klinigma.png"
            alt="Klinigma"
            width={70}
            height={70}
            className="object-contain"
          />
        </div>

        {/* Title */}
        <h3 className="text-3xl font-semibold text-center text-black-800 mb-4">
          Register
        </h3>

        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            <FieldInput control={control} name="name" label="Nama" />
            <FieldInput control={control} name="email" label="Email" />
            <FieldInput
              control={control}
              name="password"
              label="Password"
              canHide={true}
            />
            <FieldInput
              control={control}
              name="confirmPassword"
              label="Konfirmasi Password"
              canHide={true}
            />
            <FieldInput control={control} name="location" label="Kota" />
            <FieldInput
              control={control}
              name="phoneNumber"
              label="Nomor Telepon"
            />
            <FieldSelect
              control={control}
              name="gender"
              label="Jenis Kelamin"
              list={list}
              className="mt-[-1]"
            />
            <DatePicker
              type="date"
              control={control}
              name="birthDate"
              label="Tanggal Lahir"
            />
            <div className="col-span-1 sm:col-span-2">
              <Button
                type="submit"
                className="w-full py-3 text-white bg-purple-600 rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Register
              </Button>
            </div>
          </form>
        </Form>

        <div className="text-center mt-6">
          <Link to="/login" className="text-purple-600 hover:underline">
            <Button variant="link" className="text-purple-600 hover:underline">
              Kembali ke Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
