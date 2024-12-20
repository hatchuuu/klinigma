import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import BrowseDoctors from "./Browse";
import { axiosInstance } from "@/lib/axios";
import { failedToast, successToast } from "@/lib/toaster";
import Loader from "@/components/Loader";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  const fetchTableData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3002/doctors");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const HandleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/doctors/${id}`);
      fetchTableData();
      successToast(response.message);
    } catch (error) {
      failedToast(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredDoctors(doctors); // jika query kosong, tampilkan semua data
    } else {
      setFilteredDoctors(
        doctors.filter(
          (doctorsFiltered) =>
            (doctorsFiltered.name?.toLowerCase() || "").includes(
              searchQuery.toLowerCase()
            ) ||
            (doctorsFiltered.polyName?.toLowerCase() || "").includes(
              searchQuery.toLowerCase()
            ) ||
            (doctorsFiltered.email?.toLowerCase() || "").includes(
              searchQuery.toLowerCase()
            ) ||
            (doctorsFiltered.gender?.toLowerCase() || "").includes(
              searchQuery.toLowerCase()
            ) ||
            (doctorsFiltered.description?.toLowerCase() || "").includes(
              searchQuery.toLowerCase()
            )
        )
      );
    }
  }, [searchQuery, doctors]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <>
      {
        loading ?
          <div className="mx-auto px-6">
            <section className="flex flex-wrap items-center justify-start gap-5 p-4 mt-5">
              <Link to={"/dashboard"}>
                <div className="p-3 rounded-sm bg-purple-900">
                  <ArrowLeft className="text-white" />
                </div>
              </Link>
              <div>
                <h2 className="font-semibold text-[18px] sm:text-[20px] lg:text-[22px]">
                  Doctors
                </h2>
              </div>
            </section>

            <section className="p-4">
              <div className="relative mb-4">
                <Input
                  placeholder="Searching Doctors"
                  className="pl-10 h-12 text-lg"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              </div>
            </section>

            <section>
              <BrowseDoctors
                filteredDoctors={filteredDoctors}
                HandleDelete={HandleDelete}
              />
            </section>
          </div>
          :
          <Loader />
      }
    </>
  );
};

export default DoctorsPage;
