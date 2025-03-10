import { CircleUserRound, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { navItemAdmins, navItemSuperAdmins, navItemUsers } from "@/utils/arrayNavbar";
import { useAuthStore } from "@/store/store";
import { jwtDecode } from "jwt-decode";
import ToolTipComp from "../tooltip";

import DropdownNotif from "./DropdownNotif";
import { SidebarTrigger } from "../ui/sidebar";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      setUser(jwtDecode(token))
    }
  }, [token])

  let array = []
  if (user?.role == "user" || !token) {
    array = navItemUsers
  } else if (user?.role == "admin") {
    array = navItemAdmins
  } else {
    array = navItemSuperAdmins
  }

  const profileComponent = () => {
    return (
      <>
        <DropdownNotif />
        <Link to="/profil" className="flex justify-center items-center w-full gap-5 group transition-all">
          <div className="rounded-full w-max p-1 bg-white border-gray-100 border-[1px]">
            <CircleUserRound size={25} color="#171717" />
          </div>
          <div className="flex flex-col">
            <p className="font-bold uppercase w-max text-base text-white group-hover:text-main">{user?.name}</p>
            <p className="text-sm text-gray-200 group-hover:text-main">
              {user?.email}
            </p>
          </div>
        </Link>
      </>
    )
  }
  const authComponent = () => {
    return (
      <>
        <Link to="/login">
          <Button>
            Masuk
          </Button>
        </Link>
        <Link to="/register">
          <Button className="bg-white">
            Daftar
          </Button>
        </Link>
      </>
    )
  }

  return (
    <nav className='w-full z-10 top-0 fixed flex justify-between gap-8 items-center py-6 px-10 bg-neon border-b-2'>
      <div className="w-[340px] flex justify-center items-center">
        <img src="/klinigma.png" width={85} />
      </div>
      <Input className="rounded-xl py-2 w-5/12" placeholder="Cari seputar kesehatan" />
      <div className="flex gap-12 justify-center w-full ">
        {array.slice(0, 4).map((item, i) => (
          token ? (
            <Link
              to={item.url}
              key={i}
              className="flex items-center gap-2 text-xl font-semibold hover:text-main text-white transition-all">
              <span>{item.title}</span>
            </Link>
          ) : (
            <ToolTipComp message="Anda harus login terlebih dahulu" key={i} >
              <span className="hover:cursor-pointer flex items-center gap-2 text-xl font-semibold hover:text-main text-white transition-all">
                {item.title}
              </span>
            </ToolTipComp>
          )
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 px-5">
        {token ? profileComponent() : authComponent()}
      </div>
    </nav>
  );
};

export default Navbar;
