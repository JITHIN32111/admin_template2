import React from "react";
import adminIcon from "../../../src/assets/adminIcon.png";
import { useFormik } from "formik";

import {editProfileSchema} from '../../schema'
// Initial values
const editProfileinitialValues = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  password: "password123",
};

const EditProfile = () => {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: editProfileinitialValues,
    validationSchema: editProfileSchema,
    onSubmit: async (values) => {
      console.log(values);
      // Handle form submission
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen -mt-12">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full sm:w-2/3">
        {/* Avatar and Admin Details */}
        <div className="flex flex-col items-center">
          <div className="relative -top-12">
            <img
              src={adminIcon}
              alt="Profile"
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border-4 border-white shadow-md sm:shadow-lg bg-white"
            />
          </div>
          <span className="-mt-9 mb-3 text-gray-600 font-medium text-lg">
            Edit Information
          </span>
          {/* Input Fields */}
          <form onSubmit={handleSubmit} className="-mt-1 w-full space-y-2">
            <div>
              <label htmlFor="fullName" className="text-sm text-gray-500">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                className={`w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none ${touched.fullName && errors.fullName ? 'border-red-500' : ''}`}
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.fullName && errors.fullName ? (
                <div className="text-red-500 text-sm">{errors.fullName}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="email" className="text-sm text-gray-500">E-mail</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="E-mail"
                className={`w-full p-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none ${touched.email && errors.email ? 'border-red-500' : ''}`}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email ? (
                <div className="text-red-500 text-sm">{errors.email}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="password" className="text-sm text-gray-500">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className={`w-full p-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none mt-1 ${touched.password && errors.password ? 'border-red-500' : ''}`}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password ? (
                <div className="text-red-500 text-sm">{errors.password}</div>
              ) : null}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4 text-center px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 transition-all duration-300 text-white rounded-full shadow-md"
            >
              Save Changes
            </button>
            </div>
          
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
