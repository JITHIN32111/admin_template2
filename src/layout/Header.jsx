import React, { useState, useEffect, useRef } from "react";
import { ImMenu } from "react-icons/im";
import img from "../../src/assets/logo2.png";
import adminIcon from "../../src/assets/adminIcon.png";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Header({ open, setOpen }) {
  const navigate = useNavigate();

  const handleProfile = () => {
    console.log("clicked");

    navigate("/admin/edit-profile");
  };

  const handleDelete = () => {
    console.log("clicked");
  };

  const [dropdownVisible, setDropdownVisible] = useState(false); // Renamed state
  const dropdownRef = useRef(null);
  // Function to handle dropdown toggle
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <header className="bg-slate-100 text-gray-900 flex justify-between items-center  shadow-sm z-10 w-full fixed top-0">
      <div className="flex flex-row gap-x-2 items-center justify-center">
        <div className="flex justify-center items-center">
          <img
            src={img}
            className="cursor-pointer duration-500 md:ml-4 w-24 h-24"
            alt="Logo"
          />
          <h1 className="font-bold text-lg hidden md:block">WEALTA-AI</h1>
        </div>
        <ImMenu className="md:hidden" onClick={() => setOpen(true)} />
      </div>

      <div className="relative" ref={dropdownRef}>
        {/* Admin Icon */}
        <div
          className="flex items-center gap-2 mr-4 cursor-pointer"
          onClick={toggleDropdown}
        >
          <span className="hidden sm:block text-base font-medium">
            Welcome, Admin
          </span>
          <img
            src={adminIcon}
            className="w-22 h-12 rounded-full"
            alt="Admin Icon"
          />
        </div>

        {/* Dropdown */}
        {dropdownVisible && (
          <div className="absolute right-4 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="p-4 bg-blue-500 rounded-md text-white flex items-center gap-2">
              <div>
                <h4 className="font-semibold text-sm">Super Admin</h4>
                <p className="text-xs">wealthaai@gmail.com</p>
              </div>
            </div>
            <ul className="py-2 text-gray-700">
              <li
                onClick={() => handleProfile()}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <FaUserCircle /> Profile
              </li>
              <li
                onClick={() => handleDelete()}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 cursor-pointer"
              >
                <FaSignOutAlt /> Sign Out
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
