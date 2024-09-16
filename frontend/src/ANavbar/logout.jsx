import React from "react";
import { Button } from "antd";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing user data, tokens, etc.)
    localStorage.removeItem("admintoken"); 
    console.log("User logged out");
    navigate("/Alogin");
  };

  return (
    <div className="flex items-center justify-center">
      <Button
        onClick={handleLogout}
        className="bg-white text-black flex items-center justify-center"
      >
        <FiLogOut className="mr-2" /> Logout
      </Button>
    </div>
  );
};

export default LogoutButton;
