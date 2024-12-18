import { Bell, Calendar, House, User } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import DrawerMenu from "./DrawerMenu";
import NavbarButton from "./NavbarButton";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { SiderBar } from "./SiderBar";
import { useEffect, useState } from "react";
import { calculateAge } from "@/data/service";
import { getUserById } from "@/data/users";
import Loader from "./Loader";

const Navbar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const token = sessionStorage.getItem("token");
  const [user, setUser] = useState("")

  let role = null;
  let id = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
      id = decoded.id;
    } catch (error) {
      sessionStorage.removeItem("token");
      role = null;
      navigate("/login")
    }
  }

  const fetchIdUser = async () => {
    try {
      const response = await getUserById(id)
      setUser(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchIdUser()
  }, [])

  if (pathname.startsWith("/present")) {
    return null;
  }

  return (
    <>
      <div
        className={`w-full bg-transparent font-roboto ${!token ? "hidden" : "fixed"
          } bottom-3 px-4 md:hidden `}
      >
        <div className="bg-primary w-full py-2 rounded-2xl">
          <div className="flex justify-evenly items-center">
            <NavbarButton text="HOME" path="/dashboard">
              <House size={20} />
            </NavbarButton>
            {role === "user" ? (
              <NavbarButton text="BOOKING" path="/booking">
                <Calendar size={20} />
              </NavbarButton>
            ) : (
              <DrawerMenu />
            )}
            <NavbarButton text="PROFILE" path="/profile">
              <User size={20} />
            </NavbarButton>
          </div>
        </div>
      </div>
      <div
        className={` bg-white w-full font-roboto ${!token ? "hidden" : "md:fixed"
          } top-0`}
      >{
          user ?
            <section className="flex justify-between items-center p-6 md:px-8">
              <div className="flex gap-5">
                {/* Avatar with dropdown trigger */}
                <div className="rounded-full w-11 h-11 border-2 border-black cursor-pointer" />
                <div>
                  <p className="font-semibold uppercase">{user.name}</p>
                  <p className="text-xs capitalize">{user.gender}, {calculateAge(user.birthDate)} tahun</p>
                </div>
              </div>
              <div className="flex justify-center items-center gap-4 ">
                <Button variant="ghost" size="rounded">
                  <Bell />
                </Button>
                <SiderBar />
              </div>
            </section>
            :
            <Loader />
        }
      </div>
    </>
  );
};

export default Navbar;
