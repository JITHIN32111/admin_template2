import React from "react";
import {FaArrowUp, FaDollarSign, FaUser, FaPen, FaCopy, FaWallet, FaUsers, FaLevelUpAlt, FaGift,FaMoneyBillWave,FaChartLine } from "react-icons/fa";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
const DashboardCard = ({ title, value, description, tag, tagColor,icon }) => {
  return (
    <div className="bg-slate-50 p-3 px-4 sm:p-9 rounded-lg shadow-md flex flex-col space-y-2  h-full w-full"
 >
      <div className="flex justify-between gap-x-2 items-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-gray-400 text-2xl">
        {icon}
        </span>
        {/* <span className={`text-xs font-medium px-2 py-1 rounded ${tagColor}`}>
          {tag}
        </span> */}
      </div>
      <h2 className="text-3xl font-bold">{value}</h2>
      <p className="text-gray-500 text-xs md:text-base">{description}</p>
    </div>
  );
};

const CurrencyConverter = () => {
  return (
    <div className="bg-gray-50 text-gray-800 rounded-lg shadow-lg p-6 space-y-6 w-full h-full hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col items-center">
          <FaUser className="h-6 w-6 text-gray-800 hidden sm:block    " />
          <h2 className="text-2xl font-bold text-gray-800">Super Admin</h2>
        </div>
        <FaPen className="h-6 w-6 text-gray-600 cursor-pointer hover:text-indigo-500 transition-colors" />
      </div>
      <div className="flex-1 w-full space-y-4">
        <div className=" p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-md font-semibold text-gray-600">User ID</h3>
              <p className="text-lg text-gray-800">DM155465</p>
            </div>
            <div>
              <h3 className="text-md font-semibold text-gray-600">Rank</h3>
              <p className="text-lg text-gray-800">Promoter</p>
            </div>
            <div>
              <h3 className="text-md font-semibold text-gray-600">Account Status</h3>
              <p className="text-lg text-green-500">Activated</p>
            </div>
            <div>
              <h3 className="text-md font-semibold text-gray-600">Auto Pool</h3>
              <p className="text-lg text-red-500">Not Activated</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg w-full">
        <h3 className="text-lg font-semibold text-gray-700">Referral Code:</h3>
        <div className="flex items-center space-x-2">
          <p className="text-lg font-semibold text-gray-800">REF123456</p>
          <FaCopy className="h-5 w-5 text-gray-600 cursor-pointer hover:text-indigo-500 transition-colors" />
        </div>
      </div>
      <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white px-6 py-3 rounded-lg w-full transition-colors duration-300">
        Connect Wallet
      </button>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="mt-6 mb-4 min-h-screen bg-gray-100">
      <div className="p-6 flex lg:flex-row flex-col gap-6 w-full">
        <div className="flex flex-1 flex-col lg:flex-row gap-6 w-full">
          <div className="flex flex-col gap-6 flex-1">
            <div className="flex flex-row gap-2 sm:gap-6">
              <DashboardCard
                title="Earnings"
                value="$35,000"
                description="Total Earnings"
                tagColor="bg-blue-500"
                icon={<FaDollarSign />}
              />
              <DashboardCard
                title="Autopool"
                value="25"
                description="Total Active Pools"
                tagColor="bg-yellow-500"
                icon={<FaChartLine />}
              />
            </div>
            <div className="flex flex-row gap-2 sm:gap-6">
              <DashboardCard
                title="Profit"
                value="$30,000"
                description="Total Company Profit"
                tagColor="bg-blue-500"
                icon={<FaMoneyBillWave />}
              />
              <DashboardCard
                title="Withdrawal"
                value="$5,000"
                description="Total Withdrawals"
                tagColor="bg-blue-500"
                
                icon={<FaArrowUp />}
              />
            </div>
          </div>
          <CurrencyConverter />
        </div>
      </div>

      <div className="px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-2 sm:p-8 rounded-lg shadow-xl transition-transform transform hover:scale-105">
          <FaWallet className="sm:text-4xl text-3xl mb-4" />
          <h2 className="sm:text-2xl text-xl font-semibold">Wallet Amount</h2>
          <p className="sm:text-5xl text-3xl font-bold mt-2">$00</p>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-2 sm:p-8 rounded-lg shadow-xl transition-transform transform hover:scale-105">
          <BsFillArrowUpRightCircleFill className="sm:text-4xl text-3xl mb-4" />
          <h2 className="sm:text-2xl text-xl font-semibold">Rejoining Wallet</h2>
          <p className="sm:text-5xl text-3xl font-bold mt-2">$00</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-2 sm:p-8 rounded-lg shadow-xl transition-transform transform hover:scale-105">
          <FaGift className="sm:text-4xl text-3xl mb-4" />
          <h2 className="sm:text-2xl text-xl font-semibold">Rebirth Wallet</h2>
          <p className="sm:text-5xl text-3xl font-bold mt-2">$00</p>
        </div>
      </div>

    
      <div className="px-6 grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
        <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <FaWallet className="text-3xl text-gray-700 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Total Amount</h2>
          <p className="text-gray-700 text-4xl font-bold mt-2">$00</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <FaUsers className="text-3xl text-gray-700 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Total Referrals</h2>
          <p className="text-gray-700 text-4xl font-bold mt-2">$00</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <FaLevelUpAlt className="text-3xl text-gray-700 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Level Income</h2>
          <p className="text-gray-700 text-4xl font-bold mt-2">$00</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <FaGift className="text-3xl text-gray-700 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Sponsor Income</h2>
          <p className="text-gray-700 text-4xl font-bold mt-2">$00</p>
        </div>
      </div>
      <div className="px-6 grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <FaWallet className="text-3xl text-gray-700 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Total Amount</h2>
          <p className="text-gray-700 text-4xl font-bold mt-2">$00</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <FaUsers className="text-3xl text-gray-700 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Total Referrals</h2>
          <p className="text-gray-700 text-4xl font-bold mt-2">$00</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <FaLevelUpAlt className="text-3xl text-gray-700 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Level Income</h2>
          <p className="text-gray-700 text-4xl font-bold mt-2">$00</p>
        </div>
     
      </div>
    </div>
  );
};

export default AdminDashboard;
