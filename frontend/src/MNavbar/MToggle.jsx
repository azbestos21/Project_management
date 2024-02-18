import React from "react";
import { Button } from "antd";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
const ToggleButton = ({ darkTheme, toggleTheme }) => {
  return (
    <div className="-mt-36 ml-1 flex items-center justify-center">
      <Button onClick={toggleTheme} className="bg-slate-200 ">
        {darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />}
      </Button>
    </div>
  );
};

export default ToggleButton;
