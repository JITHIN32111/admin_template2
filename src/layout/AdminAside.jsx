import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdAutoAwesomeMosaic } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { ImMenu } from "react-icons/im";
import "../App.css";
import img from "../assets/logo2.png";
import { SiMicrosoftteams } from "react-icons/si";
import { FcGenealogy } from "react-icons/fc";
import { PiUsersFourFill } from "react-icons/pi";
import { FaHistory } from "react-icons/fa";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdAutoAwesomeMotion } from "react-icons/md";

const AdminAside = ({ open, setOpen }) => {
  const location = useLocation();

  const Menus = [
    { title: "Dashboard", path: "/admin", icon: <MdDashboard /> },
    { title: "Members", path: "/admin/members", icon: <FaUsers /> },
    { title: "Direct Team", path: "/admin/direct-team", icon: <SiMicrosoftteams /> },
    { title: "Genealogy", path: "/admin/genealogy", icon: <MdAutoAwesomeMosaic /> },
    { title: "Withdraw History", path: "/admin/withdraw-history", icon: <BiMoneyWithdraw /> },
    { title: "History", path: "/admin/history", icon: <FaHistory /> },
  ];

  const AdminMenus = [
    { title: "All Members", path: "/admin/all-members", icon: <PiUsersFourFill /> },
    { title: "Rejoining Balance", path: "/admin/rejoining-balance", icon: <FaWallet /> },
    { title: "Auto Pool", path: "/admin/auto-pool", icon: <MdAutoAwesomeMotion /> },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setOpen]);

  const handleMenuClick = () => {
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  };

  return (
    <div className={`relative ${window.innerWidth >= 768 ? "static" : ""}`}>
      <div
        className={`sidebar ${
          open ? "sidebar-open" : "sidebar-closed"
        } bg-slate-100 h-screen p-5 pt-6 shadow-2xl z-50 ${
          window.innerWidth < 768 ? "fixed top-0" : ""
        }`}
      >
        <ImMenu
          className={`absolute cursor-pointer -right-3 top-9 w-7 text-white bg-slate-600 shadow-2xl
          border-2 rounded-full ${
            !open && "rotate-180"
          } transition-transform duration-300`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <div className="flex justify-center items-center md:hidden">
            <img
              src={img}
              className={`cursor-pointer duration-500 md:ml-4 w-12 h-12`}
            />
            <h1 className="font-bold text-sm ">WEALTA-AI</h1>
          </div>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-800 text-sm items-center gap-x-4 ${
                Menu.gap ? "mt-9" : "mt-2"
              } ${location.pathname === Menu.path && "bg-slate-300"}`}
              onClick={handleMenuClick}
            >
              <Link to={Menu.path} className="flex items-center gap-x-4">
                <span className="text-xl">{Menu.icon}</span>
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Admin Section */}
        <h2 className={`${!open && "hidden"} origin-left duration-200 text-gray-600 font-semibold bg-gray-200 py-1 px-2 rounded-md mt-3 ml-1`}>Admin</h2>
        <ul className="pt-2">
          {AdminMenus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-800 text-sm items-center gap-x-4 ${
                Menu.gap ? "mt-9" : "mt-2"
              } ${location.pathname === Menu.path && "bg-slate-300"}`}
              onClick={handleMenuClick}
            >
              <Link to={Menu.path} className="flex items-center gap-x-4">
                <span className="text-xl">{Menu.icon}</span>
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminAside;
