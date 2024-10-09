import React from 'react';
import img from '../assets/image.png'
const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 md:px-0 sm:px-12 px-4">
      {/* Wrapper for the form and image with reduced height */}
      <div className="flex bg-white shadow-lg rounded-lg md:w-2/3 lg:w-1/2 w-full  lg:h-[70vh] h-auto">
        {/* Left section */}
        <div className="flex flex-col justify-center lg:w-2/3 w-full  p-8">
          <h1 className="text-4xl font-bold text-gray-800">Login</h1>
          <p className="mt-2 text-sm text-gray-600">Enter your account details</p>

          <form className="mt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-purple-400"
                placeholder="Enter your username"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-purple-400"
                  placeholder="Enter your password"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer">👁️</span>
              </div>
            </div>

            <div className="flex justify-end mb-4 text-sm">
              <a href="#" className="text-purple-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-purple-500 rounded-md hover:bg-purple-600"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don’t have an account?{' '}
              <a href="#" className="font-medium text-purple-600 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Right section with image */}
        <div className="hidden md:flex md:w-1/2">
          <img
            src={img}
            alt="Placeholder"
            className="object-cover w-full h-full rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
