import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  //   TableHeaderCell,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BrowseUsers = ({ filteredUsers }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Perhitungan total halaman
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Data yang ditampilkan sesuai halaman saat ini
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // untuk mengubah halaman
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Reset halaman ke 1 jika hasil query berubah
    setCurrentPage(1);
  }, [filteredUsers]);

  return (
    <div className="p-6 bg-gray-50 shadow-lg rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">Users</h1>
      </div>
      <Table className="w-full text-left">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="py-3 px-4 text-gray-700 font-semibold w-[200px]">
              ID
            </TableHead>
            <TableHead className="py-3 px-4 text-gray-700 font-semibold w-[200px]">
              User Name
            </TableHead>
            <TableHead className="py-3 px-4 text-gray-700 font-semibold w-[200px]">
              Email
            </TableHead>
            <TableHead className="py-3 px-4 text-gray-700 font-semibold w-[200px]">
              Location
            </TableHead>
            <TableHead className="py-3 px-4 text-gray-700 font-semibold w-[200px]">
              Phone Number
            </TableHead>
            <TableHead className="py-3 px-4 text-gray-700 font-semibold w-[200px]">
              Gender
            </TableHead>
            <TableHead className="py-3 px-4 text-gray-700 font-semibold w-[200px]">
              Birth Date
            </TableHead>
            <TableHead className="py-3 px-4 text-gray-700 font-semibold text-center right-0 bg-gray-100 z-10">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.map((data, index) => (
            <TableRow
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 transition duration-200`}
            >
              <TableCell className="py-3 px-4 text-gray-600">
                {data.id}
              </TableCell>
              <TableCell className="py-3 px-4 text-gray-600">
                {data.name}
              </TableCell>
              <TableCell className="py-3 px-4 text-gray-600">
                {data.email}
              </TableCell>
              <TableCell className="py-3 px-4 text-gray-600">
                {data.location}
              </TableCell>
              <TableCell className="py-3 px-4 text-gray-600">
                {data.phoneNumber}
              </TableCell>
              <TableCell className="py-3 px-4 text-gray-600">
                {data.gender}
              </TableCell>
              <TableCell className="py-3 px-4 text-gray-600">
                {data.birthDate}
              </TableCell>
              <TableCell className="py-3 px-4 text-center right-0 bg-white z-10">
                <div className="flex justify-center space-x-2">
                  {/* <Button
                    onClick={() =>
                      navigate(`/addDoctors?id=${doctors.id}&action=detail`)
                    }
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-300 focus:outline-none transition duration-300"
                  >
                    Detail
                  </Button> */}
                  <Button
                    // onClick={() =>
                    //   navigate(`/addDoctors?id=${doctors.id}&action=edit`)
                    // }
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300 focus:outline-none transition duration-300"
                  >
                    Edit
                  </Button>
                  {/* <Button
                    onClick={() => HandleDelete(doctors.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none transition duration-300"
                  >
                    Hapus
                  </Button> */}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default BrowseUsers;
