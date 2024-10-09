import React, { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import AddMember from "../../modals/AddMember";
function Table() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddMember = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Dummy data for users
  const usersData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob@example.com",
      role: "Moderator",
      status: "Active",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "User",
      status: "Inactive",
    },
  ];

  const filteredUsers = usersData.filter((user) => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="md:-mt-10 -mt-3  lg:px-24 md:px-10 px-4 pb-5">
      <h1 className="text-gray-800 text-md xs:text-xl pl-3 sm:pl-0 md:text-2xl lg:text-2xl font-semibold mb-5 mt-8 sm:mt-12 md:mt-14 lg:mt-16">
        Users List
      </h1>

      {/* Search Input */}
      <div className="mb-4 flex flex-row justify-between ">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-300 text-gray-800 p-2 rounded-lg w-1/3 focus:outline-none"
        />
        <button
          onClick={handleAddMember}
          className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 rounded-lg shadow-lg text-zinc-100 font-semibold transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add Member
        </button>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-zinc-500 font-extralight bg-gray-300">
            <tr className="h-14">
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-900 font-medium">
            {filteredUsers.map((user, index) => (
              <tr key={user.id} className="bg-zinc-100 mt-2 border">
                <th scope="row" className="px-6 py-4 font-medium text-white">
                  {index + 1}
                </th>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full ${
                      user.status === "Active" ? "bg-green-500" : "bg-red-500"
                    } text-white`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button className="text-white bg-custom-blue hover:bg-table-color py-2 px-4 rounded-lg">
          <FaChevronLeft />
        </button>
        <span className="text-white">Page 1 of 2</span>
        <button className="text-white bg-custom-blue hover:bg-table-color py-2 px-4 rounded-lg">
          <FaChevronRight />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <AddMember
          closeModal={closeModal}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          showConfirmPassword={showConfirmPassword}
        />
      )}
    </div>
  );
}

export default Table;
