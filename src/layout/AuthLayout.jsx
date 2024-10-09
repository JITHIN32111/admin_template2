import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 bg-gray-100 h-screen ">
        <Outlet /> {/* This renders the nested route content */}
      </div>
    </div>
  );
};

export default AuthLayout;
