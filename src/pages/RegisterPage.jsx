import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { registerSchema } from "@/lib/zodSchema";
import FieldInput from "@/components/form/field/FieldInput";
import FieldSelect from "@/components/form/field/FieldSelect";
import { createUser } from "@/data/createUser";
import { failedToast, successToast } from "@/lib/toaster";
import FieldBirthDate from "@/components/form/field/FieldBirthDate";

const RegisterPage = () => {
  const list = ["wanita", "pria"];
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
      birthDate: "dd/mm/yyyy",
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
    <div className="flex flex-col items-center justify-center mx-5 min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
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
            className="grid grid-cols-1 sm:gap-x-6 sm:gap-y-2 gap-1 sm:grid-cols-2"
          >
            <FieldInput control={control} name="name" label="Nama" />
            <FieldInput control={control} name="email" label="Email" />
            <FieldInput control={control} name="password" label="Password" canHide={true} />
            <FieldInput control={control} name="confirmPassword" label="Konfirmasi Password" canHide={true} />
            <FieldInput control={control} name="location" label="Kota" />
            <FieldInput control={control} name="phoneNumber" label="Nomor Telepon" />
            <FieldSelect control={control} name="gender" label="Jenis Kelamin" list={list} />
            <FieldBirthDate control={control} label="Tanggal Lahir" name="birthDate" />
            <div className="col-span-1 sm:col-span-2 mt-5">
              <Button
                type="submit"
                variant="auth"
                size="auth"
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
