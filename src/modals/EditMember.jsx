import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {editMemberSchema} from '../schema'
// Validation schema for EditMember


const EditMember = ({ isOpen, setIsOpen }) => {
  const [generalError, setGeneralError] = useState("");

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Dummy data for initial values
  const initialValues = {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    earning: 5000,
    joiningAmount: 1000,
    lastWallet: "earning",
    totalWallet: 6000,
    generationIncome: 2000,
    sponsorshipIncome: 1500,
    overallIncome: 3500,
    autoPoolAmount: 300,
    rank: "promoter",
    autoPool: true,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: editMemberSchema,
    validate: (values) => {
      const errors = {};
      Object.keys(values).forEach((key) => {
        if (values[key] === "" && key !== "autoPool") {
          errors[key] = "This field is required";
        }
      });
      if (Object.keys(errors).length) {
        setGeneralError("Please add all required information.");
      } else {
        setGeneralError("");
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log("Updated Values:", values);
      setGeneralError("");
      // Handle the submission, e.g., make an API call to update the data
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="flex justify-center items-center bg-slate-100">
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto py-4 md:py-0">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-md shadow-lg">
                <div className="absolute top-2 right-2">
                  <button
                    onClick={toggleModal}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500"
                  >
                    ✕
                  </button>
                </div>

                <div className="px-6 py-4">
                  <h2 className="text-lg font-bold mb-4 text-center text-gray-700 dark:text-gray-100">
                    Edit User Profile
                  </h2>

                  <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                      {Object.keys(formik.values).map((key) => (
                        <div key={key} className="relative">
                          <label
                            htmlFor={key}
                            className="block mb-1 text-gray-600 dark:text-gray-200 text-xs font-medium"
                          >
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </label>
                          {key === "lastWallet" || key === "rank" ? (
                            <select
                              id={key}
                              name={key}
                              className="w-full px-2 py-1 md:py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              value={formik.values[key]}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            >
                              <option value="" disabled>
                                Select {key.replace(/([A-Z])/g, ' $1')}
                              </option>
                              {key === "lastWallet" ? (
                                <>
                                  <option value="earning">Earning</option>
                                  <option value="joining">Rejoining</option>
                                </>
                              ) : (
                                <>
                                  <option value="promoter">Promoter</option>
                                  <option value="royalAchiever">Royal Achiever</option>
                                  <option value="crownAchiever">Crown Achiever</option>
                                  <option value="dAchiever">D Achiever</option>
                                </>
                              )}
                            </select>
                          ) : key === "autoPool" ? (
                            <div className="flex items-center">
                              <input
                                id={key}
                                type="checkbox"
                                name={key}
                                className="form-checkbox text-indigo-600"
                                checked={formik.values[key]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                              <label htmlFor={key} className="ml-2 text-gray-600 dark:text-gray-200 text-sm">
                                Auto Pool
                              </label>
                            </div>
                          ) : (
                            <input
                              id={key}
                              type={key.includes("Amount") || key.includes("Income") ? "number" : "text"}
                              name={key}
                              className="w-full px-2 py-1 md:py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              value={formik.values[key]}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {generalError && (
                      <div className="mt-1 text-red-500 text-sm text-center">
                        {generalError}
                      </div>
                    )}

                    <div className="mt-2 flex md:justify-end justify-center">
                      <button
                        type="submit"
                        className="btn btn-primary px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-md shadow-md hover:from-indigo-500 hover:to-blue-500 transition-all duration-300 text-sm"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditMember;
