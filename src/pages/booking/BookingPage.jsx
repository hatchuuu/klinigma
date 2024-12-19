import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
// import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/button/NavigationButton";
import Loader from "@/components/Loader";
import { successToast } from "@/lib/toaster";

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
    navigate("/booking/schedule", { state: { poliklinik } });
  };

  // Filter poliklinik berdasarkan search term
  const filteredPoliklinik = dataPoliklinik.filter((poli) => {
    const search = searchTerm.toLowerCase();
    return (
      poli.polyclinicName.toLowerCase().includes(search) ||
      poli.descriptions.toLowerCase().includes(search)
    );
  });

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <div className="min-h-screen bg-white w-full"> {successToast(error.message)}</div>;
  }

  return (
    <div className="mx-auto p-6 md:pt-24">
      <div className="flex items-center">
        <BackButton path="/dashboard" />
        <h1 className="font-bold font-sans text-2xl ml-4">Pilih Poli</h1>
        <div className="ml-auto">
          <img src="/klinigma.png" alt="Klinigma" width={90} />
        </div>
      </div>

      <section className="pb-14">
        <div className="relative my-5">
          <Input
            placeholder="Cari nama ..."
            className="pl-10 h-12 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols- lg:gap-6 ">
          {filteredPoliklinik.map((poli) => (
            <div
              key={poli.id}
              className="border rounded-lg shadow-md p-4 bg-white dark:bg-gray-800 cursor-pointer"
              onClick={() => handlePilihPoli(poli)}
            >
              <div className="flex flex-wrap justify-between gap-3">
                {/* Avatar dan Info */}
                <div className="flex gap-3 items-center">
                  <Avatar>
                    <AvatarImage src={poli.image} alt={poli.polyName} />
                    <AvatarFallback>{poli.polyclinicName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {poli.polyclinicName}
                    </h2>
                    <div className="flex flex-wrap gap-2 items-center text-sm">
                      {/* <span className="font-semibold">Jadwal Praktik:</span> */}
                      <span>{poli.schedule}</span> {/* Gunakan poli.schedule */}
                    </div>
                  </div>
                </div>
                <div className="ml-auto my-auto">
                  <ArrowRight />
                </div>

                <Separator />

                {/* Jadwal */}
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {poli.descriptions}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
