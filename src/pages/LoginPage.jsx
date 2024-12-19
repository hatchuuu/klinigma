import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,

} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "@/lib/zodSchema";
import FieldInput from "@/components/form/field/FieldInput";
import { useState } from "react";

const LoginPage = () => {
  const [err, setErr] = useState("")
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const { control, handleSubmit, reset } = form;

  const onSubmit = handleSubmit(async (value) => {
    try {
      const response = await axiosInstance.post("/login", value)
      console.log("atas", response.data.token)
      sessionStorage.setItem("token", response.data.token);
      navigate("/dashboard");
      reset()
    } catch (error) {
      setErr(error.response.data.message)
    }
  });

  return (
    <div className="flex items-center justify-center mx-5 min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/klinigma.png" alt="Klinigma" width={90} />
        </div>
        {
          err.length > 0 &&
          <div className="my-2 p-4 bg-destructive rounded-lg text-white">
            <p>{err}</p>
          </div>
        }
        <Form {...form}>
          <form onSubmit={onSubmit}>
            {/* Update Ryan */}
            <FieldInput control={control} name="email" canHide={false} label="Email" />
            <FieldInput control={control} name="password" canHide={true} label="Password" />


            <Button
              variant="auth"
              size="auth"
              type="submit"
              className="mt-5">
              Login
            </Button>
          </form>
        </Form>
        {/* Register Link */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Belum memiliki akun?{" "}
            <Link to="/register" className="text-accent hover:underline">
              Daftar disini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
