"use client";

import { MoveLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    poliklinik: "",
    dokter: "",
    // tanggal: new Date(),
    jam: "",
  });

  const today = new Date().toISOString().split("T")[0]; // Mendapatkan tanggal hari ini dalam format YYYY-MM-DD


  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  // Sample doctor data (replace with your actual data)
  const doctorsData = [
    { nama: "dr. Budi", poliklinik: "Umum" },
    { nama: "dr. Ani", poliklinik: "Gigi" },
    { nama: "dr. Chandra", poliklinik: "Mata" },
    { nama: "dr. Dewi", poliklinik: "Umum" },
    { nama: "dr. Erik", poliklinik: "THT" },
  ];

  useEffect(() => {
    setDoctors(doctorsData);
  }, []);

  useEffect(() => {
    const filtered = doctors.filter(
      (doctor) => doctor.poliklinik === formData.poliklinik
    );
    setFilteredDoctors(filtered);
  }, [formData.poliklinik, doctors]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = (event) => {
    setFormData({
      ...formData,
      tanggal: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // ... (your submit logic)
  };

  return (
    <div className="container mx-auto p-6 pb-20">
      <div className="flex justify-between items-center pb-6">
        <div className="flex items-center">
          <Link
            to={"/dashboard"}
            className="rounded-md bg-purple-900 py-2 px-4"
          >
            <MoveLeft size={30} className="text-white" />
          </Link>
          <h1 className="text-2xl font-bold ml-3">Booking Appointment</h1>
        </div>
        <img src="/klinigma.png" alt="" width={90} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label htmlFor="poliklinik" className="block mb-2">
            Poliklinik:
          </label>
          <select
            id="poliklinik"
            name="poliklinik"
            value={formData.poliklinik}
            onChange={handleChange}
            className="border border-gray-400 px-3 py-2 rounded w-full"
          >
            <option value="">Pilih Poliklinik</option>
            <option value="Umum">Umum</option>
            <option value="Gigi">Gigi</option>
            <option value="Mata">Mata</option>
            <option value="THT">THT</option>
          </select>
        </div>

        <div>
          <label htmlFor="dokter" className="block mb-2">
            Dokter:
          </label>
          <select
            id="dokter"
            name="dokter"
            value={formData.dokter}
            onChange={handleChange}
            className="border border-gray-400 px-3 py-2 rounded w-full"
          >
            <option value="">Pilih Dokter</option>
            {filteredDoctors.map((doctor) => (
              <option key={doctor.nama} value={doctor.nama}>
                {doctor.nama}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="tanggal" className="block mb-2">
            Tanggal:
          </label>
          <input
            type="date"
            id="tanggal"
            name="tanggal"
            value={today} // Tetapkan nilai value menjadi tanggal hari ini
            readOnly // Set input menjadi read-only agar tidak bisa diubah
            className="border border-gray-400 px-3 py-2 rounded w-full"
          />
        </div>

        <div>
          <label htmlFor="jam" className="block mb-2">
            Jam:
          </label>
          <select
            id="jam"
            name="jam"
            value={formData.jam}
            onChange={handleChange}
            className="border border-gray-400 px-3 py-2 rounded w-full"
          >
            <option value="">Pilih Jam</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full md:col-span-2"
        >
          Buat Antrean
        </button>
      </form>
    </div>
  );
}
