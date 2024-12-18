import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { EditUsersSchema } from "@/lib/zodSchema";
import FieldInput from "@/components/form/field/FieldInput";
import FieldInputForm from "@/components/form/field/FieldInputForm";
import FieldSelect from "@/components/form/field/FieldSelect";
import { failedToast, successToast } from "@/lib/toaster";
import FieldBirthDate from "@/components/form/field/FieldBirthDate";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowLeft } from "lucide-react";
import { userInstance } from "@/lib/axios";

function FormUesrs() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const usresId = queryParams.get("id");
  const action = queryParams.get("action");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const list = [
    { id: 1, value: "Pria" },
    { id: 2, value: "Wanita" },
  ];

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      location: "",
      phoneNumber: 0,
      gender: "",
      role: "user",
      birthDate: "dd/mm/yyyy",
    },
    resolver: zodResolver(EditUsersSchema),
  });

  const { control, handleSubmit, reset } = form;

  const handleSubmitForm = async (values) => {
    console.log("Form values:", values);
    const { ...rest } = values;
    console.log("rest", rest);
    const payload = {
      ...rest,
      password: usersData.password,
      birthDate: usersData.birthDate,
      role: usersData.role,
      createdAt: usersData.createdAt,
      id: usersData.id,
      updatedAt: usersData.updatedAt,
    };

    try {
      const response = await userInstance.put(`/users/${usresId}`, payload);
      console.log("users created successfully:", response.data);
      successToast(response.message);

      navigate("/users");
    } catch (error) {
      console.error("Error submitting form:", error);

      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred during the request.";
      failedToast(errorMessage);
    }
    console.log("Payload before sending:", payload);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (action === "detail" && usresId) {
        try {
          const response = await userInstance.get(`/users/${usresId}`);
          const usersData = response.data;
          console.log("usersData", usersData);
          setUsersData(usersData);
          reset({
            ...usersData,
            gender: usersData.gender || "",
            birthDate: usersData.birthDate,
            role: usersData.role,
            password: usersData.password,
          });
        } catch (error) {
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
          setError(error.response ? error.response.data : error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [usresId, action, reset]);

  return (
    <>
      <div className="mx-auto px-6">
        <section className="flex flex-wrap items-center justify-start gap-5 p-4 mt-5">
          <Link to={"/users"}>
            <div className="p-3 rounded-sm bg-purple-900">
              <ArrowLeft className="text-white" />
            </div>
          </Link>
          <div>
            <h2 className="font-semibold text-[18px] sm:text-[20px] lg:text-[22px]">
              {action === "detail" ? "Detail" : "Edit  "} Users
            </h2>
          </div>
        </section>

        {/* Breadcrumbs */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/users">Users</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit Users</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Form */}
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 mx-5">
          <div className="w-full bg-white shadow-lg rounded-lg p-8">
            <Form {...form}>
              <form onSubmit={handleSubmit(handleSubmitForm)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FieldInputForm
                    control={control}
                    name="name"
                    label="Nama"
                    disabled={action === "detail"}
                  />
                  <FieldInputForm
                    control={control}
                    name="email"
                    label="Email"
                    disabled={action === "detail"}
                  />
                  <FieldInput
                    control={control}
                    name="password"
                    label="Password"
                    canHide={true}
                    disabled={action === "detail"}
                  />
                  <FieldInputForm
                    control={control}
                    name="location"
                    label="Kota"
                    disabled={action === "detail"}
                  />
                  <FieldInputForm
                    control={control}
                    name="phoneNumber"
                    label="Nomor Telepon"
                    disabled={action === "detail"}
                  />
                  <FieldSelect
                    control={control}
                    name="gender"
                    label="Jenis Kelamin"
                    list={list}
                    disabled={action === "detail"}
                  />
                  <FieldBirthDate
                    control={control}
                    label="Tanggal Lahir"
                    name="birthDate"
                    disabled={action === "detail"}
                  />
                </div>
                {/* Submit and Back buttons */}
                <div className="mt-6 flex justify-end">
                  <Button
                    type="submit"
                    className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
                  >
                    Submit
                  </Button>

                  <Button
                    onClick={() => navigate("/users")}
                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ml-4"
                  >
                    Kembali
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormUesrs;
