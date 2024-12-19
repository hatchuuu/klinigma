import React, { useState, useEffect } from "react";
import { ArrowLeft, LucideAlignHorizontalSpaceBetween } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import FieldInputForm from "@/components/form/field/FieldInputForm";
import FieldSelect from "@/components/form/field/FieldSelect";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { doctorsSchema } from "@/lib/zodSchema";
import { axiosInstance } from "@/lib/axios";
import { failedToast, successToast } from "@/lib/toaster";
// import MultiSelect from "@/components/form/field/MultiSelect";
import dayjs from "dayjs";

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
  const [selectGender, setSelectedGender] = useState(null);
  const [doctorsData, setDoctorsData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const list = [
    { id: 1, value: "Pria" },
    { id: 2, value: "Wanita" },
  ];
  const hari = [
    { id: 1, value: "Senin" },
    { id: 2, value: "Selasa" },
    { id: 3, value: "Rabu" },
    { id: 4, value: "Kamis" },
    { id: 5, value: "Jumat" },
    { id: 6, value: "Sabtu" },
    { id: 7, value: "Minggu" },
  ];


  const form = useForm({
    defaultValues: {
      id: "",
      polyclinicId: "",
      name: "",
      polyName: "",
      gender: "",
      email: "",
      descriptions: "",
      phoneNumber: 0,
      location: "",
      image: "",
      schedules: [
        {
          day: "",
          open: dayjs().format("HH:mm"),
          close: dayjs().format("HH:mm"),
          quota: "",
        },
      ],
      availableDays: [],
    },
    resolver: zodResolver(doctorsSchema),
  });
  const { control, handleSubmit, reset } = form;

  // submit form
  const handleSubmitForm = async (values) => {
    console.log("Form values:", values);
    console.log("Available days:", values.availableDays);

    console.log(values.quota);
    const schedules = values.schedules.map((schedule) => ({
      day: schedule.day,
      open: schedule.open,
      close: schedule.close,
      quota: Number(schedule.quota),
    }));

    const availableDays = schedules
      .map((schedule) => schedule.day)
      .filter((day) => day);
    const { day, qouta, open, close, ...rest } = values;
    const payload = {
      ...rest,
      schedules,
      polyclinicId: selectedPoli.id,
      polyName: selectedPoli.value,
      availableDays,
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

  // add scheduled field
  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedules", // nama field array
  });

  const addJadwal = () => {
    append({
      day: "",
      open: dayjs().format("HH:mm"),
      close: dayjs().format("HH:mm"),
      quota: "",
    });
  };

  // fetch data saat edit dan detail
  useEffect(() => {
    const fetchData = async () => {
      if ((action === "detail" || action === "edit") && doctorId) {
        console.log(action);
        try {
          const response = await axiosInstance.get(`/doctors/${doctorId}`);
          const doctorData = response.data;
          setDoctorsData(doctorData);
          const schedules = doctorData.schedules.map((schedule) => ({
            day: schedule.day,
            open: schedule.open,
            close: schedule.close,
            quota: Number(schedule.quota),
          }));

          console.log("polyname", doctorData.polyName);
          console.log("gender", doctorData.gender);
          reset({
            ...doctorData,
            polyclinicId: doctorData.polyName || "",
            gender: doctorData.gender,
            availableDays: doctorData.availableDays || "",
            schedules,
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
      // const mappingOptions = data.map((item) => item.polyName);
      const mappingOptions = data.map((item) => ({
        id: item.id,
        value: item.polyclinicName,
      }));
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

  // onchange poli
  const handlePolyChange = (value) => {
    setSelectedPoli(value);
    console.log("Selected Poly:", value);
  };

  // onchangegender
  const handleGenderChange = (value) => {
    setSelectedGender(value);
    console.log("Selected gender:", value);
  };

  
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
              {action === "edit"
                ? "Edit"
                : action === "detail"
                ? "Detail"
                : "Add"}{" "}
              Doctors
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
                  <FieldInputForm
                    control={control}
                    name="phoneNumber"
                    label="Nomor Telepon"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    disabled={action === "detail"}
                  />
                  <FieldInputForm
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
                    value={selectGender}
                    onValueChange={handleGenderChange}
                    disabled={action === "detail"}
                  />
                  <FieldSelect
                    control={control}
                    name="polyclinicId"
                    label="Poly State"
                    list={poilList}
                    value={selectedPoli}
                    onValueChange={handlePolyChange}
                    disabled={action === "detail"}
                  />
                </div>

                {/* Day, Start Time, End Time, and Quota */}
                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3 mb-3"
                  >
                    <FieldSelect
                      control={control}
                      name={`schedules[${index}].day`} // Pastikan nama field sesuai dengan struktur data
                      label="Hari"
                      list={hari}
                      disabled={action === "detail"}
                    />
                    <FieldInputForm
                      control={control}
                      name={`schedules[${index}].open`} // Pastikan nama field sesuai dengan struktur data
                      label="Start Time"
                      type="time"
                      disabled={action === "detail"}
                    />
                    <FieldInputForm
                      control={control}
                      name={`schedules[${index}].close`} // Pastikan nama field sesuai dengan struktur data
                      label="End Time"
                      type="time"
                      disabled={action === "detail"}
                    />
                    <FieldInputForm
                      control={control}
                      name={`schedules[${index}].quota`} // Pastikan nama field sesuai dengan struktur data
                      label="Quota"
                      type="number"
                      disabled={action === "detail"}
                    />
                    {action !== "detail" && (
                      <>
                        <Button
                          type="button"
                          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                          onClick={() => remove(index)} // Menghapus jadwal
                        >
                          Hapus Jadwal
                        </Button>
                        <Button
                          type="button"
                          className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
                          onClick={addJadwal}
                        >
                          Tambah Jadwal
                        </Button>
                      </>
                    )}
                  </div>
                ))}

                {/* upload imgae */}
                {/* <FieldInputForm
                  control={control}
                  type="file"
                  name="image"
                  label="Upload Photo"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={action === "detail"}
                /> */}
                {/* Descriptions */}
                <div className="mt-4">
                  <FieldInputForm
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
