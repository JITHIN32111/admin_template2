import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signInSchema, signinInitialValues } from "../schema";
import { useFormik } from "formik";
import { AddMemberInitialValues, AddMemberSchema } from "../schema";
import authAPI from "../apis/authApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const { addMember } = authAPI();
function AddMember({
  closeModal,
  setShowPassword,
  showPassword,
  setShowConfirmPassword,
  showConfirmPassword,
}) {
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: AddMemberInitialValues,
      validationSchema: AddMemberSchema,
      onSubmit: async (values) => {
        const data = {
          name: values.name,
          email: values.email,
          password: values.password,
        };
        try {
          const res = await addMember(data);
           console.log(res);
           
          if (res?.status === 200) {
            toast.success("Success", {
              position: "top-center",
              onClose: () => {
                closeModal();
              }
            });
          }

          if (res?.status == 400) {
            toast.error("user alreadt exists", {
              position: "top-center",
              onClose: () => {
                closeModal();
              }
            });
            
          }
        } catch (e) {
          console.log(e);
          toast.error("server error", {
            position: "top-center",
            onClose: () => {
              closeModal();
            }
          });
        }
      },
    });
  return (
    <div>
      <ToastContainer />

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Add New Member
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <label className="block text-gray-600">Username</label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Enter username"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name ? (
                <div className="absolute left-0 mb-1 w-full text-red-500 text-sm">
                  {errors.name}
                </div>
              ) : null}
            </div>

            <div
              className="
            relative"
            >
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email ? (
                <div className="absolute left-0 mb-1 w-full text-red-500 text-sm">
                  {errors.email}
                </div>
              ) : null}
            </div>

            {/* Password field with show/hide toggle */}
            <div className="relative">
              <label className="block text-gray-600">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none pr-10"
                placeholder="Enter password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <div
                className="absolute right-2 top-1/2 pt-2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {touched.password && errors.password ? (
                <div className="absolute left-0 mb-1 w-full text-red-500 text-sm">
                  {errors.password}
                </div>
              ) : null}
            </div>

            {/* Confirm Password field with show/hide toggle */}
            <div className="relative">
              <label className="block text-gray-600">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none pr-10"
                placeholder="Confirm password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <div
                className="absolute right-2 top-1/2 pt-2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {touched.confirmPassword && errors.confirmPassword ? (
                <div className="absolute left-0 mb-1 w-full text-red-500 text-sm">
                  {errors.confirmPassword}
                </div>
              ) : null}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMember;
