import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "@/lib/zodSchema";
import FieldInput from "@/components/form/field/FieldInput";
import { failedToast } from "@/lib/toaster";
import { useCallback, useState } from "react";
import { useAuthStore } from "@/store/store";


const LoginPage = () => {
  const setToken = useAuthStore((state) => state.setToken)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const { control, handleSubmit, reset } = form;

  const onSubmit = useCallback(
    handleSubmit(async (value) => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.post("/auth/login", value);
        setToken(data.accessToken);
        navigate("/dashboard");
      } catch (error) {
        const text = error?.response?.data?.error || "Login gagal!";
        failedToast(text);
      } finally {
        reset();
        setLoading(false);
      }
    }),
    [handleSubmit, navigate, reset, setToken]
  );

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-lg w-full">
        <div className="flex justify-between items-end mb-8">
          <h3 className="text-3xl font-bold text-black mb-4">
            #Halaman Login
          </h3>
          <img src="/klinigma.png" alt="Klinigma" width={120} />
        </div>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <FieldInput control={control} name="email" label="Email" />
            <FieldInput control={control} name="password" type="password" label="Password" />

            <Link to="/">
              <p className="hover:text-black hover:underline transition-colors w-full text-right text-slate-500">Lupa Password?</p>
            </Link>

            <Button type="submit" variant={"auth"} disabled={loading} className="bg-white text-center mt-8">
              {loading ? "..." : "Masuk"}
            </Button>
          </form>
        </Form>

        <p className="w-full text-center mt-8 mb-2 text-slate-500">Belum memiliki akun?</p>
        <Link to="/register">
          <Button type="submit" variant={"auth"} className="bg-main text-center" >
            Daftar
          </Button>
        </Link>

      </div>

    </div>
  );
};

export default LoginPage;
