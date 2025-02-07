import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getAllPolyclinics } from "@/data/polyclinics";
import { failedToast } from "@/lib/toaster";
import { Button } from "@/components/ui/button";

export default function BookingPage() {
  const navigate = useNavigate();
  const [polyclinics, setPolyclinics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllPolyclinics = async () => {
      try {
        const response = await getAllPolyclinics({
          page: 1,
          limit: 10
        })
        setPolyclinics(response)
      } catch (error) {
        failedToast(error.message)
        navigate(-1);
      }
    }
    fetchAllPolyclinics()
  }, [])

  const handleSendPolyclinic = (polyclinicId) => {
    navigate("/pendaftaran/jadwal", { state: { polyclinicId } });
  };

  const filteredPolyclinics = polyclinics.filter((poly) => {
    const search = searchTerm.toLowerCase();
    return (
      poly.polyclinicName.toLowerCase().includes(search) ||
      poly.descriptions.toLowerCase().includes(search)
    );
  });

  return (
    <div className="w-full py-36">
      <div className="max-w-6xl mx-auto flex flex-col gap-[3rem]">
        <section className="flex w-full justify-between items-end">
          <h3 className="text-4xl font-bold text-black mb-1">
            #Halaman Pendaftaran
          </h3>
          <img src="/klinigma.png" alt="Klinigma" width={120} />
        </section>

        <section className="relative mt-10">
          <Input
            placeholder="Cari Poliklinik"
            className="ps-7 peer"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="transition-all absolute z-10 right-4 bottom-[10px] peer-hover:bottom-[7.1px] peer-hover:right-[9.5px] peer-focus-visible:bottom-[7.5px] peer-focus-visible:right-[10px]" />
        </section>

        <div className="grid grid-cols-2 gap-6 ">
          {filteredPolyclinics.map((poli) => (
            <Button
              key={poli.id}
              className="neo-button neo-button-hover rounded-2xl p-8 bg-white cursor-pointer hover:bg-secondary/40 group"
              onClick={() => handleSendPolyclinic(poli.id)}
            >
              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Avatar className="w-16 h-16 ">
                    <AvatarImage src={poli.image} alt={poli.polyName} />
                    <AvatarFallback className="text-xl group-hover:border-neon group-hover:text-2xl transition-all">{poli.polyclinicName[0]}</AvatarFallback>
                  </Avatar>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-gray-200">
                    {poli.polyclinicName}
                  </p>
                  <div className="group-hover:-all">
                    <ArrowRight />
                  </div>
                </div>
                <Separator />
                <p className="text-base text-left text-gray-500 dark:text-gray-400">
                  {poli.descriptions}
                </p>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
