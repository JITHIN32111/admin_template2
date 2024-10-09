import React from "react";
import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center  items-center h-screen bg-gray-300">
      <PuffLoader size={60} color={"#123abc"} loading={true} />
    </div>
  );
};

export default Loader;
