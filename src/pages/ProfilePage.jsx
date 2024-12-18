import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { getUserById } from "@/data/users";
import AlertButton from "@/components/AlertButton";

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
    try {
      const fetchUserById = async () => {
        const response = await getUserById(id);
        setData(response.data);
      };
      fetchUserById();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const array = [
    { title: "Email", data: data?.email },
    { title: "Tanggal Lahir", data: data?.birthDate },
    { title: "Nomor Telepon", data: data?.phoneNumber },
    { title: "Jenis Kelamin", data: data?.gender },
  ];

  const rowProfile = () =>
    array.map((value, i) => (
      <>
        <div key={i} className="flex justify-between mb-7">
          <h3 className="text-xl text-gray-600">{value.title}</h3>
          <h3 className="text-xl">{value.data}</h3>
        </div>
        <Separator className="mb-7" />
      </>
    ));

  return (
    <div className="h-screen items-center flex flex-col p-8 sm:pt-44">
      {data ? (
        <div className="flex flex-col sm:w-1/3">
          <section className="flex flex-col justify-center items-center gap-1 mb-20">
            <h1 className="text-4xl font-semibold uppercase">{name}</h1>
            <h1 className="text-base font-semibold capitalize">( {role} )</h1>
          </section>
          {rowProfile()}
          <div className="w-full flex justify-end">
            <AlertButton handleLogout={handleLogout} />
          </div>
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
