import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { failedToast } from "@/lib/toaster";
import { getAllDoctors } from "@/api/doctors";
import { getCurrentISODate, getDateByNumber, isLateHour } from "@/utils/dayjs";
import DialogQueueButton from "@/components/button/DetailQueueButton";

function BookingSchedule() {
  const navigate = useNavigate();
  const location = useLocation();
  const [listDoctors, setListDoctors] = useState([]);
  const [day, setDay] = useState(getCurrentISODate());
  const { polyclinicId } = location.state || {};
  const availableDate = getDateByNumber(7)

  useEffect(() => {
    if (!polyclinicId) {
      return navigate("/pendaftaran");
    }
    const fetchAllDoctorsByPoly = async () => {
      try {
        const response = await getAllDoctors({
          polyclinicId: polyclinicId,
        })
        setListDoctors(response)
      } catch (error) {
        failedToast(error.message)
        navigate(-1);
      }
    }
    fetchAllDoctorsByPoly()
  }, [polyclinicId]);

  const validatedSchedules = (schedules) => {
    const schedule = schedules.find((s) =>
      s.day === day.day &&
      s.quota > 0
      && isLateHour(s.endTime)
    );
    return schedule
      ? { startTime: schedule.startTime, endTime: schedule.endTime, quota: Number(schedule.quota) }
      : { startTime: "-", endTime: "-", quota: 0 };
  };

  return (
    <div className="w-full py-40">
      <div className="max-w-6xl mx-auto flex flex-col gap-[4rem]">
        <section className="flex w-full justify-between items-end">
          <div className="flex flex-col gap-2">
            <h3 className="text-4xl font-bold text-black mb-1">
              #Pilih Kunjungan
            </h3>
            <h3 className="text-2xl font-bold text-gray-400">
              / {listDoctors[0]?.polyclinicName}
            </h3>
          </div>
          <img src="/klinigma.png" alt="Klinigma" width={120} />
        </section>

        <section className="flex flex-col justify-between items-center bg-lime-300/50 rounded-xl p-8">
          <p className="text-2xl font-semibold text-gray-900">/Tanggal Kunjungan</p>
          <p className="text-base text-gray-600 mb-10">
            Pilih tanggal kunjungan yang tersedia
          </p>
          <div className="flex justify-center items-center gap-4">
            {
              availableDate.map((d, i) => {
                return (
                  <Button key={i}
                    className={` ${day.day == d.day && "bg-white"} w-32 aspect-square rounded-xl flex flex-col`}
                    onClick={() => setDay(d)}
                  >
                    <div className="capitalize">
                      {d.day}
                    </div>
                    <div>
                      {d.date}
                    </div>
                  </Button>
                )
              })
            }
          </div>
        </section>

        <section
          id="dokter-spesialis"
          className="flex flex-col justify-between items-center bg-lime-300/50 rounded-xl p-8">
          <p className="text-2xl font-semibold text-gray-900">/Dokter Spesialis</p>
          <p className="text-base text-gray-600 mb-10">
            Pilih dokter yang tersedia pada tanggal kunjungan
          </p>
          <div className="flex justify-center gap-8 w-full items-center">
            {
              listDoctors.map((d, i) => {
                const selectDay = validatedSchedules(d.schedules)
                const isSelect = selectDay.startTime == "-"
                return (
                  <DialogQueueButton day={day} key={i} doctor={d} selectDay={selectDay}>
                    <Button disabled={isSelect}
                      className={`${isSelect && "bg-main"} aspect-square rounded-xl h-64 flex flex-col gap-3 justify-center items-center`}>
                      <p>{d.name}</p>
                      <p>{selectDay?.startTime} - {selectDay?.endTime}</p>
                      <p>Kuota tersisa - {selectDay?.quota}</p>
                    </Button>
                  </DialogQueueButton>
                )
              }
              )
            }
          </div>
        </section>
      </div>
    </div>
  )
}
export default BookingSchedule;
