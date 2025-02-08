import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import About from "@/components/dashboard/About";
import ListDoctor from "@/components/dashboard/ListDoctor";
import CarouselQueue from "@/components/dashboard/CarouselQueue";
import { failedToast } from "@/lib/toaster";
import { getAllQueuesByUser } from "@/api/queue";
import FeatureServices from "@/components/dashboard/FeatureServices";
import FacilityServices from "@/components/dashboard/FacilityServices";
import Articles from "@/components/dashboard/Articles";
import Maps from "@/components/dashboard/Maps";
import { getDay, getHour } from "@/utils/dayjs";
import { getSchedulesByDate } from "@/api/schedule";
import CardAdminQueue from "@/components/dashboard/CardAdminQueue";

const DashboardPage = () => {
  const [data, setData] = useState(null)
  const [role, setRole] = useState("")
  const [poly, setPoly] = useState("")

  useEffect(() => {
    const fetchMountData = async () => {
      const token = sessionStorage.getItem("token")
      if (!token) return
      try {
        const { id, role, polyId } = jwtDecode(token)
        setRole(role)
        setPoly(polyId)
        let response = null
        if (role == "user") { response = await fetchAllQueues(id) }
        if (role == "admin") { response = await fetchSchedulesDoctor(polyId) }
        setData(response)
      } catch (error) {
        failedToast(error.message)
      }
    }
    fetchMountData()
  }, [])

  const fetchAllQueues = async (id) => {
    const response = await getAllQueuesByUser({
      userId: id,
      limit: 5,
      status: ["waiting", "progress"]
    })
    return response
  }

  const fetchSchedulesDoctor = async (polyId) => {
    const day = getDay(new Date())
    const time = getHour(new Date())
    const response = await getSchedulesByDate({
      day,
      time,
      polyclinicId: polyId
    })
    return response
  }

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="w-full py-36">
      <div className="max-w-6xl mx-auto flex flex-col gap-[3.5rem]">
        <section className="flex w-full justify-between items-end">
          <h3 className="text-4xl font-bold text-black mb-1">
            #Halaman Dashboard
          </h3>
          <img src="/klinigma.png" alt="Klinigma" width={120} />
        </section>
        {role == "admin" && <CardAdminQueue data={data} poly={poly} />}
        {role == "user" && <CarouselQueue queue={data} />}
        <FeatureServices handleScroll={handleScroll} role={role} />
        <About />
        <ListDoctor />
        <FacilityServices />
        <Articles />
        <Maps />
      </div>
    </div>
  );
};

export default DashboardPage;
