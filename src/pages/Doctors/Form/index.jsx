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
  const hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
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
      day: "",
    },
    resolver: zodResolver(doctorsSchema),
  });
  const { control, handleSubmit, reset } = form;

  const onSubmit = handleSubmit(async (values) => {
    const schedule = {
      day: values.day,
      open: values.open,
      close: values.close,
    };
    const { day, open, close, ...rest } = values;
    const payload = {
      // ...values,
      ...rest,
      schedule:schedule
    };
    try {
      console.log(values);
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
      failedToast(response.message);
    }
  });

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
            day:doctorData.schedule.day || "",
            open:doctorData.schedule.open || "",
            close:doctorData.schedule.day || ""
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
          <div className="w-full  bg-white shadow-lg rounded-lg p-8">
            <Form {...form}>
              <form onSubmit={onSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FieldInput
                    control={control}
                    name="name"
                    label="Nama"
                    disabled={action == "detail"}
                  />
                  <FieldSelect
                    control={control}
                    name="polyName"
                    label="Poly State"
                    list={poilList}
                    value={selectedPoli} // Set selected value from state
                    onChange={(value) => setSelectedPoli(value)}
                  />
                  <FieldInput control={control} name="email" label="Email" />
                  <FieldInput
                    control={control}
                    name="phoneNumber"
                    label="Nomor Telepon"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                  <FieldSelect
                    control={control}
                    name="gender"
                    label="Jenis Kelamin"
                    list={list}
                  />
                  <FieldInput
                    control={control}
                    name="location"
                    label="Lokasi"
                  />
                  <FieldInput
                    control={control}
                    name="open"
                    label="Start Time"
                    type="time"
                  />
                  <FieldInput
                    control={control}
                    name="close"
                    label="End Time"
                    type="time"
                  />
                  <FieldSelect
                    control={control}
                    name="day"
                    label="Hari"
                    list={hari}
                  />
                  <FieldInput
                    control={control}
                    name="descriptions"
                    label="Descriptions"
                  />
                </div>
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
