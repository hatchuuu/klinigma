import { Bell, Calendar, House, User } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import DrawerMenu from "./DrawerMenu";
import NavbarButton from "./NavbarButton";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "./ui/button";
import { SiderBar } from "./SiderBar";
import { useEffect, useState } from "react";
import { calculateAge } from "@/data/service";
import { getUserById } from "@/data/users";
import Loader from "./Loader";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [user, setUser] = useState("");

  let role = null;
  let id = null;
  let name = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
      id = decoded.id;
      name = decoded.name;
    } catch (error) {
      sessionStorage.removeItem("token");
      role = null;
      navigate("/login");
    }
  }

  const fetchIdUser = async () => {
    try {
      const response = await getUserById(id);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchIdUser();
    }
  }, [token]);

  if (pathname.startsWith("/present")) {
    return null;
  }

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const items = [
    {
      title: "Beranda",
      url: "/dashboard",
      icon: House,
    },
    {
      title: "Antrean",
      url: "/booking",
      icon: Calendar,
    },
    {
      title: "Profil",
      url: "/profile",
      icon: User,
    },
  ];

  return (
    <>
      <div>
        <div
          className={` bg-white w-full font-roboto z-10 ${!token ? "hidden" : "fixed"
            } top-0`}
        >
          {user ? (
            <section className="flex justify-between items-center p-6 md:px-10 ">
              <div className="flex gap-5">
                {/* Avatar with dropdown trigger */}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="rounded-full w-11 h-11 border-2 border-black cursor-pointer flex justify-center items-center">
                      <User />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white shadow-lg rounded-lg p-2 w-48">
                    <DropdownMenuItem
                      className="text-sm text-purple-800"
                      onClick={handleLogout}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div>
                  <p className="font-semibold uppercase">{user.name}</p>
                  <p className="text-xs capitalize">
                    {user.gender}, {calculateAge(user.birthDate)} tahun
                  </p>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="flex flex-wrap gap-4">
                  {items.map((item, i) => (
                    <p
                      key={i}
                      className="flex items-center justify-center semibold px-4 py-2"
                    // asChild
                    >
                      <Link
                        to={item.url}
                        className="flex items-center gap-2 text-[20] semibold hover:text-purple-700"
                      >
                        {/* <item.icon className="text-black" /> */}
                        <span>{item.title}</span>
                      </Link>
                    </p>
                  ))}
                </div>
              </div>
              <SiderBar />
            </section>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
