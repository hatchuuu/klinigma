import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { getUserById } from "@/data/users";

const ProfilePage = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const jwt = jwtDecode(token);
  const { name, role, id } = jwt;
  const [data, setData] = useState();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const response = await getUserById(id);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserById();
  }, [id]);

  return (
    <div className="h-screen flex flex-col p-8 sm:pt-32">
      {data ? (
        <div className="flex flex-col">
          <div className="flex justify-between mb-7">
            <h3 className="text-xl text-gray-600">Name</h3>
            <h3 className="text-xl">{name}</h3>
          </div>

          <Separator className="mb-7" />

          <div className="flex justify-between mb-7">
            <h3 className="text-xl text-gray-600">Date of birth</h3>
            <h3 className="text-xl">{data.birthDate}</h3>
          </div>

          <Separator className="mb-7" />

          <div className="flex justify-between mb-7">
            <h3 className="text-xl text-gray-600">Phone number</h3>
            <h3 className="text-xl">{data.phoneNumber}</h3>
          </div>

          <Separator className="mb-7" />

          <div className="flex justify-between mb-7">
            <h3 className="text-xl text-gray-600">Gender</h3>
            <h3 className="text-xl">
              {data.gender === "pria"
                ? "Laki-laki"
                : data.gender
                ? "Wanita"
                : data.gender}
            </h3>
          </div>

          <Separator className="mb-7" />

          <div className="flex justify-between mb-7">
            <h3 className="text-xl text-gray-600">Email</h3>
            <h3 className="text-xl">{data.email}</h3>
          </div>

          <Separator className="mb-7" />

          {/* <div className="flex justify-between mb-7">
                        <h3 className="text-xl text-gray-600">Password</h3>
                        <Link>
                            <h3 className="text-xl text-purple-950">Change Password</h3>
                        </Link>
                    </div> */}

          <Button className="w-full rounded-3xl" onClick={handleLogout}>
            <h3 className="text-lg">Logout</h3>
          </Button>
        </div>
      ) : (
        <div className="flex w-full justify-center items-center p-2">
          <p className="page-loader" />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
