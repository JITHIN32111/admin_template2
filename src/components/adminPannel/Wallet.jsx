import React from 'react';
import { FaWallet, FaInfoCircle } from 'react-icons/fa'; // Importing icons

const Wallet = () => {
  return (
    <div className="min-h-screen flex items-center justify-center -mt-10 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        {/* Wallet Icon */}
        <div className="flex justify-center mb-4">
          <FaWallet className="text-6xl text-indigo-600" />
        </div>

        {/* Wallet Info */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Total Rejoining Balance</h2>
          <p className="mt-4 text-5xl font-semibold text-blue-500">₹ 10,000</p>
        </div>

        {/* Description with Icon */}
        <div className="mt-6 text-gray-600 text-center flex items-center justify-center space-x-2">
          <FaInfoCircle className="text-xl text-indigo-600" />
          <p>Your total rejoining wallet amount will be shown here!</p>
        </div>

        {/* View Wallet Button */}
        <div className="mt-8 text-center">
          {/* <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg flex items-center justify-center space-x-2 hover:bg-indigo-700 transition">
            <FaWallet className="text-lg" />
            <span>View Wallet Details</span>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
