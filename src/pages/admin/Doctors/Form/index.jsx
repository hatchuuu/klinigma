import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import FieldInput from "@/components/form/field/FieldInput";
import FieldSelect from "@/components/form/field/FieldSelect";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { doctorsSchema } from "@/lib/zodSchema";
import { axiosInstance } from "@/lib/axios";
import { failedToast, successToast } from "@/lib/toaster";
import FieldMultiSelect from "@/components/form/field/MultiSelect";

function FormDoctors() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const doctorId = queryParams.get("id");
  const action = queryParams.get("action");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [poilList, setPoliList] = useState([]);
  const [selectedPoli, setSelectedPoli] = useState(null);

  const list = ["wanita", "pria"];
  const hari = [
    { value: "1", label: "Senin" },
    { value: "2", label: "Selasa" },
    { value: "3", label: "Rabu" },
    { value: "4", label: "Kamis" },
    { value: "5", label: "Jumat" },
    { value: "6", label: "Sabtu" },
    { value: "7", label: "Minggu" },
  ];

  const form = useForm({
    defaultValues: {
      name: "",
      polyName: "",
      gender: "",
      email: "",
      phoneNumber: 0,
      descriptions: "",
      location: "",
      open: "",
      close: "",
      availableDays: [],
      quota: "",
    },
    resolver: zodResolver(doctorsSchema),
  });
  const { control, handleSubmit, reset } = form;
  
  const handleSubmitForm = async (values) => {
    console.log("Available days:", values.availableDays);
    console.log("Form values:", values);
    // console.log("availableDays", availableDays)
    // const availableDaysFormatted = values.availableDays.map((day) =>
    //   parseInt(day, 10)
    // );

    const schedule = {
      open: values.open,
      close: values.close,
    };

    const { open, close, ...rest } = values;
    const payload = {
      ...rest,
      schedule: schedule,
      // availableDays: availableDaysFormatted,
    };

    console.log("Payload before sending:", payload);

    try {
      if (action === "edit" && doctorId) {
        // Update
        const response = await axiosInstance.put(
          `/doctors/${doctorId}`,
          payload
        );
        console.log("Doctor updated successfully:", response.data);
        successToast(response.message);
      } else {
        // Create
        const response = await axiosInstance.post("/doctors", payload);
        console.log("Doctor created successfully:", response.data);
        successToast(response.message);
      }

      navigate("/doctors");
    } catch (error) {
      console.error("Error submitting form:", error);

      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred during the request.";
      failedToast(errorMessage);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if ((action === "detail" || action === "edit") && doctorId) {
        console.log(action);
        try {
          const response = await axiosInstance.get(`/doctors/${doctorId}`);
          const doctorData = response.data;
          reset({
            ...doctorData,
            polyName: doctorData.polyName || "",
            phoneNumber: doctorData.phoneNumber || "",
            gender: doctorData.gender || "",
            availableDays: doctorData.availableDays || "",
            open: doctorData.schedule.open || "",
            close: doctorData.schedule.close || "",
          });
          console.log("doctorData", response.data);
        } catch (error) {
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
          setError(error.response ? error.response.data : error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [doctorId, action, reset]);

  // dropdown poli
  const fetchTableData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/polyclinics");
      const data = response.data;
      const mappingOptions = data.map((item) => item.polyName);
      setPoliList(mappingOptions);
      console.log(mappingOptions);
    } catch (error) {
      setError("Failed to fetch data.");
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <>
      <div className="mx-auto px-6">
        <section className="flex flex-wrap items-center justify-start gap-5 p-4 mt-5">
          <Link to={"/doctors"}>
            <div className="p-3 rounded-sm bg-purple-900">
              <ArrowLeft className="text-white" />
            </div>
          </Link>
          <div>
            <h2 className="font-semibold text-[18px] sm:text-[20px] lg:text-[22px]">
              Add Doctors
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
              <BreadcrumbLink href="/doctors">Doctors</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Add Doctors</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Form */}
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 mx-5">
          <div className="w-full bg-white shadow-lg rounded-lg p-8">
            <Form {...form}>
              <form onSubmit={handleSubmit(handleSubmitForm)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FieldInput
                    control={control}
                    name="name"
                    label="Nama"
                    disabled={action === "detail"}
                  />
                  <FieldInput
                    control={control}
                    name="email"
                    label="Email"
                    disabled={action === "detail"}
                  />
                  <FieldInput
                    control={control}
                    name="phoneNumber"
                    label="Nomor Telepon"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    disabled={action === "detail"}
                  />
                  <FieldInput
                    control={control}
                    name="location"
                    label="Lokasi"
                    disabled={action === "detail"}
                  />
                  <FieldSelect
                    control={control}
                    name="gender"
                    label="Jenis Kelamin"
                    list={list}
                    disabled={action === "detail"}
                  />
                  <FieldSelect
                    control={control}
                    name="polyName"
                    label="Poly State"
                    list={poilList}
                    value={selectedPoli}
                    onChange={(value) => setSelectedPoli(value)}
                    disabled={action === "detail"}
                  />
                </div>

                {/* Day, Start Time, End Time, and Quota */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <FieldMultiSelect
                    control={control}
                    name="availableDays"
                    label="Hari"
                    list={hari}
                    disabled={action === "detail"}
                  />

                  <FieldInput
                    control={control}
                    name="open"
                    label="Start Time"
                    type="time"
                    disabled={action === "detail"}
                  />
                  <FieldInput
                    control={control}
                    name="close"
                    label="End Time"
                    type="time"
                    disabled={action === "detail"}
                  />
                  <FieldInput
                    control={control}
                    name="quota"
                    label="Quota"
                    type="number"
                    disabled={action === "detail"}
                  />
                </div>

                {/* Descriptions */}
                <div className="mt-4">
                  <FieldInput
                    control={control}
                    name="descriptions"
                    label="Descriptions"
                    isTextarea={true}
                    disabled={action === "detail"}
                  />
                </div>

                {/* Submit and Back buttons */}
                <div className="mt-6 flex justify-end">
                  {action !== "detail" && (
                    <Button
                      type="submit"
                      className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
                    >
                      Submit
                    </Button>
                  )}
                  <Button
                    onClick={() => navigate("/doctors")}
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

export default FormDoctors;
