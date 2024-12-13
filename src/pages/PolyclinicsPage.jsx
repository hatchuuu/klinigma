import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";

const PolyclinicsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const poliklinikData = [
    {
      name: "Poliklinik Jantung",
      participants: 500,
      schedule: { day: "Senin", start: "08:00", end: "16:00" },
      description: "Deskripsi singkat tentang poliklinik Jantung...",
    },
    {
      name: "Poliklinik Paru - Paru",
      participants: 300,
      schedule: { day: "Selasa", start: "09:00", end: "17:00" },
      description: "Deskripsi singkat tentang poliklinik Paru - Paru...",
    },
    {
      name: "Poliklinik Mata",
      participants: 400,
      schedule: { day: "Rabu", start: "08:30", end: "14:00" },
      description: "Deskripsi singkat tentang poliklinik Mata...",
    },
    {
      name: "Poliklinik Gigi",
      participants: 200,
      schedule: { day: "Kamis", start: "09:00", end: "15:30" },
      description: "Deskripsi singkat tentang poliklinik Gigi...",
    },
  ];

  // Fungsi untuk memfilter data
  const filteredPoliklinik = poliklinikData.filter((poli) =>
    poli.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <div className="mx-auto px-6">
      <section className="flex flex-wrap items-center justify-start gap-5 p-4 mt-5">
        <Link to={"/dashboard"}>
          <div className="p-3 rounded-sm bg-purple-900">
            <ArrowLeft className="text-white" />
          </div>
        </Link>
        <div>
          <h2 className="font-semibold text-[18px] sm:text-[20px] lg:text-[22px]">
            Daftar Poliklinik
          </h2>
        </div>
      </section>

      <section className="p-4">
        <div className="relative mb-4">
          <Input
            placeholder="Searching Poliklinik..."
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
              className="border rounded-lg shadow-md p-4 bg-white dark:bg-gray-800"
            >
              <div className="flex flex-wrap justify-between gap-3">
                {/* Avatar dan Info */}
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {poli.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Peserta Tercatat: {poli.participants} orang
                    </p>
                  </div>
                </div>

                {/* Jadwal */}
                <div className="flex flex-wrap gap-2 items-center text-sm">
                  <span className="font-semibold">Jadwal:</span>
                  <span>{poli.schedule.day}</span>
                  <span>{poli.schedule.start}</span>
                  <span>{poli.schedule.end}</span>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Deskripsi */}
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {poli.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PolyclinicsPage;
