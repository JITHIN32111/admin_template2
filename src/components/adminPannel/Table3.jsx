import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaEye, FaEyeSlash } from "react-icons/fa";

function Table3() {
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
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Inactive" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "User", status: "Active" },
    { id: 4, name: "Bob Brown", email: "bob@example.com", role: "Moderator", status: "Active" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "Inactive" },
  ];

  const filteredUsers = usersData.filter((user) => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  const [activeTab, setActiveTab] = useState(1); 
  return (
    <div className="md:-mt-10 -mt-3  lg:px-24 md:px-10 px-4 pb-5">
      {/* <h1 className="text-gray-800 text-md xs:text-xl pl-3 sm:pl-0 md:text-2xl lg:text-2xl font-semibold mb-5 mt-8 sm:mt-12 md:mt-14 lg:mt-16">
        Users List
      </h1> */}

      {/* Search Input */}

      <ul className="relative mb-5 mt-16 flex justify-center space-x-2">
  {Array.from({ length: 7 }, (_, i) => (
    <li key={i + 1} className="relative">
      <div
        className={`block cursor-pointer shadow-lg rounded-lg p-4 transition-all duration-300 ease-in-out ${
          activeTab === i + 1
            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
            : 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-100'
        }`}
        onClick={() => setActiveTab(i + 1)}
      >
        Level {i + 1}
      </div>
      {/* {activeTab === i + 1 && (
        <div className="absolute inset-x-0 bottom-0 transform translate-y-full bg-gray-800 text-white rounded-lg p-2 shadow-lg">
          <p>Details for Level {i + 1}</p>
        </div>
      )} */}
    </li>
  ))}
</ul>






      <div className="mb-4 mt-8 flex flex-row justify-between ">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-300 text-gray-800 p-2 rounded-lg w-1/3 focus:outline-none"
        />
        
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-zinc-500 font-extralight bg-gray-300">
            <tr className="h-14">
              <th scope="col" className="px-6 py-3">#</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Role</th>
              <th scope="col" className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 font-medium">
            {filteredUsers.map((user, index) => (
              <tr key={user.id} className="bg-zinc-100 mt-2 border">
                <th scope="row" className="px-6 py-4 font-medium text-white">{index + 1}</th>
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
     
    </div>
  );
}

export default Table3;
