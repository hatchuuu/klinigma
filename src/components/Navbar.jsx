import { Calendar, House, User } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import DrawerMenu from "./DrawerMenu";
import NavbarButton from "./NavbarButton";

const Navbar = () => {
  const token = localStorage.getItem("token");
  // const { role } = jwtDecode(token);
  // periksai token
  let role = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      role = null;
      window.location.href = "/login";
    }
  }
  return (
    // <div
    //   className={`w-full bg-transparent ${
    //     !token ? "hidden" : "fixed"
    //   } bottom-3 px-4`}
    // >
    //   <div className="bg-primary w-full py-2 rounded-2xl">
    //     <div className="flex justify-evenly items-center">
    //       <NavbarButton text="HOME" path="/dashboard">
    //         <House size={20} />
    //       </NavbarButton>
    //       {role == "user" ? (
    //         <NavbarButton text="BOOKING" path="/booking">
    //           <Calendar size={20} />
    //         </NavbarButton>
    //       ) : (
    //         <DrawerMenu />
    //       )}
    //       <NavbarButton text="PROFILE" path="/profile">
    //         <User size={20} />
    //       </NavbarButton>
    //     </div>
    //   </div>
    // </div>

    <div
      className={`w-full bg-transparent ${
        !token ? "hidden" : "fixed"
      } bottom-3 px-4`}
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
  );
};

export default Navbar;
