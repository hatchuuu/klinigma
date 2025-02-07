import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { userSchema } from "@/lib/zodSchema";
import FieldInput from "@/components/form/field/FieldInput";
import { failedToast, successToast } from "@/lib/toaster";
import { axiosInstance } from "@/lib/axios";
import FieldSelect from "@/components/form/field/FieldSelect";
import FieldBirthDate from "@/components/form/field/FieldBirthDate";
import FieldFile from "@/components/form/field/FieldFile";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      location: "",
      phoneNumber: "",
      gender: "",
      imageId: null,
      imageSelfie: null,
      birthDate: "",
      numberKTP: "",
      numberKK: "",
      numberBPJS: "",
      role: "user",
    },
    resolver: zodResolver(userSchema),
  });
  const { control, handleSubmit, reset } = form;

  const onSubmit = handleSubmit(async (value) => {
    setLoading(true);
    const formData = new FormData();
    const { imageId, imageSelfie, ...rest } = value;
    formData.append("imageId", imageId);
    formData.append("imageSelfie", imageSelfie);
    Object.entries(rest).forEach(([key, value]) => {
      formData.append(key, value);
    })

    try {
      const response = await axiosInstance.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status == 201) {
        successToast(response.data.message);
        reset()
      } else {
        throw new Error(response);
      }
    } catch (error) {
      console.log(error)
      failedToast(error.response.data.error);
    }
    finally {
      setLoading(false);
    }
  });

  const listGender = [
    {
      "value": "laki-laki",
      "label": "Laki-Laki"
    },
    {
      "value": "perempuan",
      "label": "Perempuan"
    }
  ]

  return (
    <div className="my-28 flex flex-col items-center justify-center mx-5 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl">

        <div className="flex justify-between items-end mb-8">
          <h3 className="text-3xl font-bold text-black-800 mb-4">
            #Halaman Daftar
          </h3>
          <img src="/klinigma.png" alt="Klinigma" width={120} />
        </div>

        <Form {...form}>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-8">
              <div className="bg-lime-300/50 rounded-xl p-8">
                <p className="text-2xl font-semibold text-gray-800 mb-1">/Data Login</p>
                <p className="text-base text-gray-600 mb-5">
                  Data akan digunakan pada saat masuk ke website
                </p>
                <div className="grid grid-cols-2 gap-x-10">
                  <FieldInput control={control} name="name" label="Nama" />
                  <FieldInput control={control} name="email" label="Email" />
                  <FieldInput control={control} name="password" label="Password" canHide={true} />
                  <FieldInput control={control} name="confirmPassword" label="Konfirmasi Password" canHide={true} />
                </div>
              </div>
              <div className="bg-lime-300/50 rounded-xl p-8">
                <p className="text-2xl font-semibold text-gray-800 mb-1">/Data Lainnya</p>
                <p className="text-base text-gray-600 mb-5">
                  Data akan digunakan sebagai informasi tambahan
                </p>
                <div className="grid grid-cols-2 gap-x-10">
                  <FieldInput control={control} name="location" label="Domisili" />
                  <FieldInput control={control} name="phoneNumber" label="Nomor Telepon" />
                  <FieldSelect control={control} name="gender" label="Jenis Kelamin" list={listGender} />
                  <FieldBirthDate control={control} name="birthDate" label="Tanggal Lahir" />
                  <FieldInput control={control} name="numberKTP" label="Nomor KTP" />
                  <FieldInput control={control} name="numberKK" label="Nomor KK" />
                  <FieldInput control={control} name="numberBPJS" label="Nomor BPJS" />
                </div>
              </div>
              <div className="bg-lime-300/50 rounded-xl p-8">
                <p className="text-2xl font-semibold text-gray-800 mb-1">/Data Foto</p>
                <p className="text-base text-gray-600 mb-5">
                  Data akan digunakan sebagai verifikasi identitas pribadi
                </p>
                <div className="grid grid-cols-2 gap-x-10">
                  <FieldFile control={control} name="imageId" label="Foto KTP" />
                  <FieldFile control={control} name="imageSelfie" label="Foto Selfie" />
                </div>
              </div>
            </div>
            <Button
              type="submit"
              variant="auth"
              disabled={loading}
              className="bg-main mt-12"
            >
              {loading ? "..." : "Daftar"}
            </Button>
          </form>
        </Form>

        <Link to="/login">
          <p className="hover:text-black hover:underline transition-colors w-full text-center mt-6 text-slate-500">
            Kembali ke halaman login
          </p>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
