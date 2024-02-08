import React from "react";
import { Button } from "antd";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
const ToggleButton = () => {
  return (
    <div className="darkTheme,toggleTheme">
      <Button onClick="{toggleTheme}">
        {darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />}
      </Button>
    </div>
  );
};

export default ToggleButton;
