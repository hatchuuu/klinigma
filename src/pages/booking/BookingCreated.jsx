
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/button/NavigationButton";
import moment from "moment"; // Make sure you have moment.js installed
import { Card } from "@/components/ui/card";
import { failedToast, successToast } from "@/lib/toaster";
import { getAllQueue, getAllQueuesByUser } from "@/data/queue";
import { jwtDecode } from "jwt-decode";
import { getFullDateByQueue } from "@/utils/dayjs";

function BookingCreated() {
  const location = useLocation();
  const navigate = useNavigate();
  const [queue, setQueue] = useState([]);
  const [name, setName] = useState("");
  const { isSuccess, doctorId } = location.state;

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if (!isSuccess) {
      return navigate("/pendaftaran");
    }
    const fetchQueueByUser = async () => {
      try {
        const { id, name } = jwtDecode(token)
        const response = await getAllQueuesByUser({
          doctorId: doctorId,
          userId: id,
          limit: 1,
          sort: "desc"
        })
        setQueue(response[0])
        setName(name)
      } catch (error) {
        failedToast(error.message)
        navigate("/dashboard");
      }
    }
    fetchQueueByUser()
  }, []);

  // console.log({ queue })

  const messageQueueArray = [
    {
      title: "Poliklinik : ",
      message: queue?.queueNumber
    },
    {
      title: "Nama Dokter : ",
      message: queue?.queueNumber
    },
    {
      title: "Tanggal : ",
      message: queue?.queueNumber
    },
    {
      title: "Jam Mulai Pelayanan : ",
      message: queue?.queueNumber
    },
    {
      title: "Nama :",
      message: name
    },
  ]
  return (
    <div className="w-full py-36">
      <div className="max-w-5xl mx-auto flex flex-col gap-[3rem]">

        <section className="flex w-full justify-between items-end">
          <div className="flex flex-col gap-2">
            <h3 className="text-4xl font-bold text-black mb-1">
              #Pendaftaran Berhasil
            </h3>
            <h3 className="text-xl font-semibold text-gray-500">
              /Segera menuju poliklinik yang dipilih
            </h3>
          </div>
          <img src="/klinigma.png" alt="Klinigma" width={120} />
        </section>

        <div className='w-full p-12 bg-secondary rounded-2xl shadow-xl border-gray-200'>
          <div className="flex w-full justify-center items-center bg-white p-5">
            <div className="w-full flex flex-col items-center justify-center gap-10 py-5">
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-3xl font-bold ">Poliklinik Negeri Medan</p>
                <p className="text-sm text-gray-400">terima kasih sudah menggunakan layanan kami</p>
              </div>
              <p className="text-9xl font-extrabold">1</p>
              <p className="text-base font-semibold">Antrean anda</p>
            </div>
            <div className="w-full">
              <p className="text-center">1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingCreated;
