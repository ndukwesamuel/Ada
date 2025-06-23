import React, { useState } from "react";
import ReusableTable from "../../reuseable/reuseableTable";

const UserTable = () => {
  const columns = [
    {
      header: "S/N",
      accessor: (row, index) => index + 1,
    },
    { header: "User Name", accessor: "userName" },
    { header: "Email address", accessor: "email" },
    { header: "Gender", accessor: "gender" },
    { header: "Estate Area", accessor: "estateArea" },
    { header: "Resident ID", accessor: "residentID" },
    { header: "Phone No.", accessor: "phone" },
    { header: "Time Joined", accessor: "timeJoined" },
    { header: "House Address", accessor: "houseAddress" },
    {
      header: "Status",
      accessor: "",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  const data = [
    {
      userName: "Zain Gouse",
      email: "tanya.hill@example.com",
      gender: "Male",
      estateArea: "California Estate",
      residentID: "70668",
      phone: "078 8502 2342",
      timeJoined: "Mon 08 Jun, 2020 01:55 am",
      houseAddress: "320, Oak St, San Francisco, Florida",
      status: "Active",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="  ">
      <ReusableTable columns={columns} data={currentData} />
      <div className="pagination mt-4 flex justify-center">
        {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map(
          (number) => (
            <button
              key={number + 1}
              onClick={() => handlePageChange(number + 1)}
              className={`px-2 py-1 mx-1 ${
                currentPage === number + 1
                  ? "bg-primary text-white"
                  : "bg-gray-200"
              }`}
            >
              {number + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default UserTable;
