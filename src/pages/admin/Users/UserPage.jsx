// import UserChart from "@/components/charts/UserCharts";
// import { TableComponent } from "@/components/table/TableComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUsersbyRole } from "@/data/users";
import { failedToast } from "@/lib/toaster";
import { ChevronLeft, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BrowseUsers from "./Browse/Index";

const UserPage = () => {
  const [data, setData] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(data);
  const fetchAllUsers = async () => {
    const response = await getUsersbyRole();
    if (response.status == 404) {
      failedToast(response.message);
    } else {
      setData(response);
      console.log(response);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const navigate = useNavigate();

  //   const [filterData, setFilterData] = useState("");

  //   const filteredInput = data?.filter((value) =>
  //     value.name.toLowerCase().includes(filterData.toLowerCase())
  //   );

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredUsers(data); // jika query kosong, tampilkan semua data
    } else {
      setFilteredUsers(
        data.filter(
          (usersFiltered) =>
            (usersFiltered.id?.toLowerCase() || "").includes(
              searchQuery.toLowerCase()
            ) ||
            (usersFiltered.name?.toLowerCase() || "").includes(
              searchQuery.toLowerCase()
            ) ||
            (usersFiltered.location?.toLowerCase() || "").includes(
              searchQuery.toLowerCase()
            ) ||
            (usersFiltered.email?.toLowerCase() || "").includes(
              searchQuery.toLowerCase()
            ) ||
            (usersFiltered.gender?.toLowerCase() || "").includes(
              searchQuery.toLowerCase()
            ) ||
            (usersFiltered.birthDate?.toLowerCase() || "").includes(
              searchQuery.toLowerCase()
            )
        )
      );
    }
  }, [searchQuery, data]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="p-8 flex flex-col gap-4 mb-52 md:pt-32 pt-20">
      <section className="flex gap-5 items-center">
        <Button onClick={() => navigate("/dashboard")}>
          <ChevronLeft size={20} />
        </Button>
        <h1>DAFTAR USER</h1>
      </section>

      {/* <section>
        <UserChart />
      </section> */}
      {/* <section>
        <Input
          className="h-10 w-full border border-gray-300 rounded-md px-3 mb-3"
          value={filterData}
          onChange={(e) => setFilterData(e.target.value)}
          placeholder="Cari User"
        />
      </section> */}

      <section className="p-4">
        <div className="relative mb-4">
          <Input
            placeholder="Cari User"
            className="pl-10 h-12 text-lg"
            value={searchQuery}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
        </div>
      </section>

      {filteredUsers ? (
        <BrowseUsers filteredUsers={filteredUsers} />
      ) : (
        <div className="flex justify-center items-center mt-3">
          <p className="table-loader"></p>
        </div>
      )}
    </div>
  );
};

export default UserPage;
