import React from "react";
import logo from "../assets/logo.jpg";
const Logoimg = () => {
  return (
    <div className="flex items-center justify-center p-2">
      <div className="w-10 h-10 flex justify-center items-center">
        <img src={logo} className="w-10 h-10 " />
      </div>
    </div>
  );
};

export default Logoimg;
