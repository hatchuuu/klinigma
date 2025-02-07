import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import About from "@/components/dashboard/About";
import ListDoctor from "@/components/dashboard/ListDoctor";
import CarouselQueue from "@/components/dashboard/CarouselQueue";
import { failedToast } from "@/lib/toaster";
import { getAllQueuesByUser } from "@/data/queue";
import FeatureServices from "@/components/dashboard/FeatureServices";
import FacilityServices from "@/components/dashboard/FacilityServices";
import Articles from "@/components/dashboard/Articles";
import Maps from "@/components/dashboard/Maps";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [queues, setQueues] = useState([])

  useEffect(() => {
    const fetchQueuesByUser = async () => {
      const token = sessionStorage.getItem("token")
      if (!token) return
      try {
        const { id } = jwtDecode(token)
        const response = await getAllQueuesByUser({
          userId: id,
          limit: 5,
          status: ["waiting", "progress"]
        })
        setQueues(response)
      } catch (error) {
        failedToast(error.message)
      }
    }
    fetchQueuesByUser()
  }, [])

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="w-full py-36">
      <div className="max-w-6xl mx-auto flex flex-col gap-[5rem]">
        <section className="flex w-full justify-between items-end">
          <h3 className="text-4xl font-bold text-black mb-1">
            #Halaman Dashboard
          </h3>
          <img src="/klinigma.png" alt="Klinigma" width={120} />
        </section>
        <CarouselQueue queue={queues} />
        <FeatureServices handleScroll={handleScroll} />
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
