import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
// import { Input } from "@/components/ui/input";
import { ArrowLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/button/NavigationButton";

export default function BookingPage() {
  const navigate = useNavigate();
  const [dataPoliklinik, setDataPoliklinik] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPoliklinik = async () => {
      try {
        const response = await fetch("http://localhost:3002/polyclinics"); // Ganti dengan URL endpoint JSON Server kamu
        if (!response.ok) {
          throw new Error("Gagal mengambil data poliklinik");
        }
        const data = await response.json();
        setDataPoliklinik(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoliklinik();
  }, []);

  const handlePilihPoli = (poliklinik) => {
    // Redirect ke halaman PilihJadwal
    navigate("/booking/pilih-jadwal", { state: { poliklinik } });
  };

  // Filter poliklinik berdasarkan search term
  const filteredPoliklinik = dataPoliklinik.filter((poli) => {
    const search = searchTerm.toLowerCase();
    return (
      poli.polyName.toLowerCase().includes(search) ||
      poli.descriptions.toLowerCase().includes(search)
    );
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mx-auto p-6">
      <div className="flex items-center">
        <BackButton path="/dashboard" />
        <h1 className="font-bold font-sans text-2xl ml-4">Pilih Poli</h1>
        <div className="ml-auto">
          <img src="/klinigma.png" alt="Klinigma" width={90} />
        </div>
      </div>

      <section className="mt-10">
        <div className="relative mb-4">
          <Input
            placeholder="Cari nama ..."
            className="pl-10 h-12 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols- lg:gap-6">
          {filteredPoliklinik.map((poli, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-md p-4 bg-white dark:bg-gray-800 cursor-pointer"
              onClick={() => handlePilihPoli(poli)} // Tambahkan onClick di sini
            >
              <div className="flex flex-wrap justify-between gap-3">
                {/* Avatar dan Info */}
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src={poli.image} alt={poli.polyName} />
                    <AvatarFallback>{poli.polyName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {poli.polyName}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Deskripsi: {poli.descriptions}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Jadwal */}
                <div className="flex flex-wrap gap-2 items-center text-sm">
                  <span className="font-semibold">Jadwal:</span>
                  {poli.openDay.map((day, index) => (
                    <span key={index}>{day}</span>
                  ))}
                  <span>
                    {poli.openTime[0]}:{poli.openTime[1]}
                  </span>
                </div>
              </div>

              {/* Deskripsi */}
              {/* <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {poli.description}
                </p>
              </div> */}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
