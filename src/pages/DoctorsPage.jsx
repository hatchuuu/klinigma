import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import React, { useState, useMemo, useEffect } from "react";
import { Activity, Heart, Baby, FlaskConical } from "lucide-react";
import SearchInput from "@/components/SearchInput";
import { BackButton } from "@/components/button/NavigationButton";
import { getDoctorForTeam } from "@/data/doctors";
import { axiosInstance } from "@/lib/axios";

const DoctorsPage = () => {
  const [doctor, setDoctor] = useState([]);
  const [poliist, setPoliList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctor);
  // const doctors = useMemo(
  //   () => [
  //     {
  //       id: 1,
  //       nama: "Dr. Budi Santoso",
  //       spesialis: "Penyakit Dalam",
  //       poliklinik: "Internis",
  //       lulusan: "Universitas Indonesia",
  //       deskripsi:
  //         "Dokter berpengalaman dengan keahlian khusus di bidang penyakit dalam.",
  //       foto: "https://mysiloam-api.siloamhospitals.com/storage-down/doctor/doctor_2022_02_25_15453316457787330221645778733022.jpeg",
  //     },
  //     {
  //       id: 2,
  //       nama: "Dr. Ani Rahmawati",
  //       spesialis: "Kandungan",
  //       poliklinik: "Obgyn",
  //       lulusan: "Universitas Gadjah Mada",
  //       deskripsi:
  //         "Dokter ramah dan sabar, ahli dalam menangani kehamilan dan persalinan.",
  //       foto: "https://res.cloudinary.com/dk0z4ums3/image/upload/v1689046321/image_doctor/dr.-Ani-Christnayeo%2C-Sp.PD.JPG-d3d48dc5-c621-41d7-b61e-02cad4ff2671.jpg",
  //     },
  //     {
  //       id: 3,
  //       nama: "Dr. Chandra Wijaya",
  //       spesialis: "Jantung",
  //       poliklinik: "Kardiologi",
  //       lulusan: "Universitas Airlangga",
  //       deskripsi: "Dokter spesialis jantung dengan reputasi yang sangat baik.",
  //       foto: "https://res.cloudinary.com/dk0z4ums3/image/upload/w_100,h_100,c_thumb,dpr_2.0,f_auto,q_auto/v1721204498/image_doctor/dr.-Chandra-Irawan%2C-Sp.KJ-07d4c862-fcce-443d-b4fd-50afdb341e4f.jpg",
  //     },
  //     {
  //       id: 4,
  //       nama: "Dr. Dewi Lestari",
  //       spesialis: "Anak",
  //       poliklinik: "Pediatri",
  //       lulusan: "Universitas Padjadjaran",
  //       deskripsi:
  //         "Dokter yang ahli dalam menangani berbagai masalah kesehatan anak.",
  //       foto: "https://res.cloudinary.com/dk0z4ums3/image/upload/w_100,h_100,c_thumb,dpr_2.0,f_auto,q_auto/v1686217610/image_doctor/dr.-Dewi-Andriyati%2C-M.Ked%2C-Sp.OG-d69cfead-b814-4d7e-bc75-204e5fb39fb2.png",
  //     },
  //     {
  //       id: 5,
  //       nama: "Dr. Erik Pratama",
  //       spesialis: "Bedah",
  //       poliklinik: "Bedah Umum",
  //       lulusan: "Universitas Diponegoro",
  //       deskripsi: "Dokter bedah yang terampil dan berpengalaman.",
  //       foto: "https://res.cloudinary.com/dk0z4ums3/image/upload/w_100,h_100,c_thumb,dpr_2.0,f_auto,q_auto/v1548228816/image_doctor/dr.Eric%20%28white%29.JPG.jpg",
  //     },
  //   ],
  //   []
  // );

  // const poliklinikIcons = useMemo(
  //   () => ({
  //     Internis: Activity,
  //     Obgyn: Baby,
  //     Kardiologi: Heart,
  //     Pediatri: Baby,
  //     "Bedah Umum": FlaskConical,
  //   }),
  //   []
  // );

  const fetchDoctorForTeam = async () => {
    try {
      const doctorTeam = await getDoctorForTeam();
      setDoctor(doctorTeam.data);
      console.log("doctorTeam", doctorTeam);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTableDataPoli = async () => {
    try {
      const response = await axiosInstance.get("/polyclinics");
      const data = response.data;
      setPoliList(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDoctorForTeam();
    fetchTableDataPoli();
  }, []);

  const getPolyNameById = (polyId) => {
    const polyclinic = poliist.find((poly) => poly.id === polyId);
    return polyclinic ? polyclinic.polyclinicName : "Unknown Poly";
  };

  // const [searchTerm, setSearchTerm] = useState("");
  // const [filteredDoctors, setFilteredDoctors] = useState(doctor);

  // const handleInputChange = (event) => {
  //   const term = event.target.value.toLowerCase();
  //   setSearchTerm(term);
  //   filterDoctors(term);
  // };

  // const filterDoctors = (term) => {
  //   const filtered = doctor.filter((doctor) => {
  //     return (
  //       doctor.nama.toLowerCase().includes(term) ||
  //       doctor.spesialis.toLowerCase().includes(term) ||
  //       doctor.poliklinik.toLowerCase().includes(term)
  //     );
  //   });
  //   setFilteredDoctors(filtered);
  // };

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredDoctors(doctor); // jika query kosong, tampilkan semua data
    } else {
      setFilteredDoctors(
        doctor.filter(
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
  }, [searchQuery, doctor]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="w-full p-6 flex flex-col gap-6 md:pt-32 mt-24">
        <div className="flex items-center">
          <BackButton path="/dashboard" />
          <h1 className="font-bold font-sans text-2xl ml-4">Daftar Dokter</h1>
          <div className="ml-auto">
            <img src="/klinigma.png" alt="Klinigma" width={90} />
          </div>
        </div>

        <SearchInput
          handleChange={handleSearch}
          defaultValue={searchQuery}
          placeHolder="Cari Nama Dokter, Spesialis Poliklinik ..."
        />

        {/* Apply grid view for larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {filteredDoctors.map((doctor) => (
            <Card
              key={doctor.id}
              className="shadow-lg rounded-lg overflow-hidden"
            >
              {/* Header Card */}
              <CardHeader className="p-6">
                <div className="flex items-center gap-3">
                  {/* Gambar Dokter */}
                  <img
                    className="rounded-xl h-12 w-12 object-cover"
                    src={doctor.image}
                    alt={doctor.name}
                  />
                  {/* Informasi Dokter */}
                  <div>
                    <h1 className="font-semibold text-lg">{doctor.name}</h1>
                  </div>
                  {/* Nama Poli */}
                  <div className="ml-auto text-sm text-purple-950 flex items-center gap-2">
                    <h1>{getPolyNameById(doctor.polyclinicId)}</h1>
                  </div>
                </div>
              </CardHeader>

              {/* Deskripsi Card */}
              <div className="border-t">
                <CardDescription className="p-6">
                  <h2 className="font-medium text-md mb-2">Jadwal:</h2>
                  {doctor.schedules && Array.isArray(doctor.schedules) ? (
                    doctor.schedules.map((schedule) => (
                      <div key={schedule.day} className="text-sm text-gray-700">
                        {schedule.day}: {schedule.open} - {schedule.close}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No available days</p>
                  )}
                </CardDescription>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default DoctorsPage;
