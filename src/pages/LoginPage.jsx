import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginInstance } from "@/lib/axios";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "@/lib/zodSchema";
import FormComponents from "@/components/form/FieldInput";

const LoginPage = () => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const { control, handleSubmit } = form;

  const onSubmit = handleSubmit(async (value) => {
    const { email, password } = value;
    try {
      const response = await loginInstance("", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/klinigma.png" alt="Klinigma" width={90} />
        </div>

        <Form {...form}>
          <form onSubmit={onSubmit}>
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-md font-semibold text-gray-700">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      {...field}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-md font-semibold text-gray-700">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            {/* Link Lupa Password */}
            <div className="flex justify-end mb-6">
              <Link
                to="/reset-password"
                className="text-sm text-purple-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300"
            >
              Login
            </Button>
          </form>
        </Form>
        {/* Register Link */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-purple-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
