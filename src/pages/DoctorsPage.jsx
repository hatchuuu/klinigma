import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { MoveLeft, Search } from "lucide-react";
import React, { useState, useMemo } from "react";
import {
  Activity, 
  Heart, 
  Baby, 
  FlaskConical, 
} from "lucide-react";
import { Link } from "react-router-dom";

const DoctorsPage = () => {
  const doctors = useMemo(() => [
    {
      id: 1,
      nama: "Dr. Budi Santoso",
      spesialis: "Penyakit Dalam",
      poliklinik: "Internis",
      lulusan: "Universitas Indonesia",
      deskripsi: "Dokter berpengalaman dengan keahlian khusus di bidang penyakit dalam.",
      foto: "https://mysiloam-api.siloamhospitals.com/storage-down/doctor/doctor_2022_02_25_15453316457787330221645778733022.jpeg", 
    },
    {
      id: 2,
      nama: "Dr. Ani Rahmawati",
      spesialis: "Kandungan",
      poliklinik: "Obgyn",
      lulusan: "Universitas Gadjah Mada",
      deskripsi: "Dokter ramah dan sabar, ahli dalam menangani kehamilan dan persalinan.",
      foto: "https://res.cloudinary.com/dk0z4ums3/image/upload/v1689046321/image_doctor/dr.-Ani-Christnayeo%2C-Sp.PD.JPG-d3d48dc5-c621-41d7-b61e-02cad4ff2671.jpg", 
    },
    {
      id: 3,
      nama: "Dr. Chandra Wijaya",
      spesialis: "Jantung",
      poliklinik: "Kardiologi",
      lulusan: "Universitas Airlangga",
      deskripsi: "Dokter spesialis jantung dengan reputasi yang sangat baik.",
      foto: "https://res.cloudinary.com/dk0z4ums3/image/upload/w_100,h_100,c_thumb,dpr_2.0,f_auto,q_auto/v1721204498/image_doctor/dr.-Chandra-Irawan%2C-Sp.KJ-07d4c862-fcce-443d-b4fd-50afdb341e4f.jpg", 
    },
    {
      id: 4,
      nama: "Dr. Dewi Lestari",
      spesialis: "Anak",
      poliklinik: "Pediatri",
      lulusan: "Universitas Padjadjaran",
      deskripsi: "Dokter yang ahli dalam menangani berbagai masalah kesehatan anak.",
      foto: "https://res.cloudinary.com/dk0z4ums3/image/upload/w_100,h_100,c_thumb,dpr_2.0,f_auto,q_auto/v1686217610/image_doctor/dr.-Dewi-Andriyati%2C-M.Ked%2C-Sp.OG-d69cfead-b814-4d7e-bc75-204e5fb39fb2.png", 
    },
    {
      id: 5,
      nama: "Dr. Erik Pratama",
      spesialis: "Bedah",
      poliklinik: "Bedah Umum",
      lulusan: "Universitas Diponegoro",
      deskripsi: "Dokter bedah yang terampil dan berpengalaman.",
      foto: "https://res.cloudinary.com/dk0z4ums3/image/upload/w_100,h_100,c_thumb,dpr_2.0,f_auto,q_auto/v1548228816/image_doctor/dr.Eric%20%28white%29.JPG.jpg", 
    },
  ], []);

  const poliklinikIcons = useMemo(() => ({
    Internis: Activity,
    Obgyn: Baby,
    Kardiologi: Heart,
    Pediatri: Baby,
    "Bedah Umum": FlaskConical,
  }), []);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  const handleSearch = (event) => {
    event.preventDefault();
    const term = event.target.elements["doctors-search"].value.toLowerCase();
    setSearchTerm(term);
    filterDoctors(term); 
  };

  const handleInputChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    filterDoctors(term); 
  };

  const filterDoctors = (term) => {
    const filtered = doctors.filter((doctor) => {
      return (
        doctor.nama.toLowerCase().includes(term) ||
        doctor.spesialis.toLowerCase().includes(term) ||
        doctor.poliklinik.toLowerCase().includes(term)
      );
    });
    setFilteredDoctors(filtered);
  };

  return (
    <>
      <div className="w-full p-6 flex flex-col gap-6">
        <div className="flex items-center">
          <Link to={"/dashboard"} className="rounded-md bg-purple-900 py-2 px-4">
            <MoveLeft size={30} className="text-white" />
          </Link>
          <h1 className="font-bold font-sans text-2xl ml-4">Daftar Dokter</h1>
          <div className="ml-auto">
            <img src="/klinigma.png" alt="Klinigma" width={90} /> 
          </div>
        </div>

        <form onSubmit={handleSearch}>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search />
            </div>
            <input
              type="text"
              id="doctors-search"
              className="block w-full p-4 ps-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Cari Nama Dokter, Spesialis Poliklinik ..."
              required
              value={searchTerm} 
              onChange={handleInputChange}
            />
          </div>
        </form>

        <div className="flex flex-col gap-6 pb-12">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id}>
              <CardHeader>
                <div className="flex gap-3 items-center">
                  <img className="rounded-xl h-12" src={doctor.foto} alt={doctor.nama} />
                  <div>
                    <h1>{doctor.nama}</h1>
                    <h1>Spesialis {doctor.spesialis}</h1>
                  </div>
                  <div className="ml-auto flex text-purple-950 gap-2 items-center">
                    <h1 className="text-sm">{doctor.poliklinik}</h1>
                    {poliklinikIcons[doctor.poliklinik] && React.createElement(poliklinikIcons[doctor.poliklinik], { size: 35 })}
                  </div>
                </div>
              </CardHeader>
              <div className="border-t">
                <CardDescription className="px-6 p-6">
                  <div>
                    <div>{doctor.deskripsi}</div>
                    <div>Lulusan {doctor.lulusan}</div>
                  </div>
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