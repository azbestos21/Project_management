import React, { useState, useEffect } from "react";
import RNSIT from "../assets/RNSIT.jpg";
import { Carousel } from "antd";
import CSE from "../assets/CSE.jpeg";
import Backgimg from "../assets/rns1.jpg";
import { studentlogin, studentsignup } from "./Services/Api";
import { useNavigate } from "react-router-dom";

export default function Loginpg() {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsn] = useState("");
  const [Name, setName] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [signInButtonStyle, setSignInButtonStyle] = useState({
    backgroundImage: "linear-gradient(to right, #6a11cb 0%, #ff4b2b 100%)",
  });
  const [signUpButtonStyle, setSignUpButtonStyle] = useState({
    backgroundColor: "slate",
  });

  const handleSignInClick = () => {
    setShowSignIn(true);
    setShowSignUp(false);
    setSignInButtonStyle({
      backgroundColor: "slate ",
      backgroundImage: "linear-gradient(to right, #6a11cb 0%, #ff4b2b 100%)",
    });
    setSignUpButtonStyle({ backgroundColor: "slate" });
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowSignIn(false);
    setSignInButtonStyle({ backgroundColor: "slate" });
    setSignUpButtonStyle({
      backgroundColor: "slate",
      backgroundImage: "linear-gradient(to right, #6a11cb 0%, #ff4b2b 100%)",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await studentlogin({ username, password });
      localStorage.setItem("studenttoken", data.userData.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const data = await studentsignup({
        username,
        Name,
        password,
        confirmpassword,
        email,
      });
      localStorage.setItem("studenttoken", data.userData.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem("studenttoken");
    };
    handleLogout();
  }, []);

  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${Backgimg})` }}>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex flex-col justify-center items-center">
        <div className="text-center mb-8">
          <p className="text-white text-4xl font-serif">
            Project Management System
          </p>
        </div>
        <div className="bg-white bg-opacity-60 p-8 rounded-lg shadow-lg w-80">
          <h2 className="text-2xl text-center mb-4">Student</h2>
          <div className="flex gap-3 mb-5 justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              onClick={handleSignInClick}
              
            >
              SIGN IN
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              onClick={handleSignUpClick}
              
            >
              SIGN UP
            </button>
          </div>
          {showSignIn && (
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                className="p-3 border rounded"
                type="text"
                placeholder="USN"
                onChange={(e) => setUsn(e.target.value)}
              />
              <input
                className="p-3 border rounded"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Login
              </button>
            </form>
          )}
          {showSignUp && (
            <form onSubmit={handleSignup} className="flex flex-col gap-4">
              <input
                className="p-3 border rounded"
                type="text"
                placeholder="USN"
                onChange={(e) => setUsn(e.target.value)}
              />
              <input
                className="p-3 border rounded"
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="p-3 border rounded"
                type="email"
                placeholder="Email"
                onChange={(e) => setUseremail(e.target.value)}
              />
              <input
                className="p-3 border rounded"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="p-3 border rounded"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
