import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminAside from "./AdminAside"; // Sidebar component
import Header from "./Header";
const MainLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <Header open={open} setOpen={setOpen} />
      <div className="flex flex-1 overflow-y-auto pt-24">
        <AdminAside
          className={`fixed top-24 z-20 ${
            open ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
          open={open}
          setOpen={setOpen}
        />
        <div className="flex-1 overflow-y-auto bg-gray-100 h-screen p-2">
          <Outlet /> {/* This renders the nested route content */}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
