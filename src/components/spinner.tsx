import React from "react";
import PuffLoader from "react-spinners/PuffLoader";
export default function SpinnerLayout() {
  return (
    <div className="flex justify-center items-center h-screen">
      <PuffLoader color="#3aaade" size={100} />
    </div>
  );
}
