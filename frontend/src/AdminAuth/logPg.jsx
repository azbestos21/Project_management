import React from "react";
import { useState, useEffect } from "react";
import Loading from "../Loading";
import bg from "../assets/rns1.jpg";
import backimg from "../assets/Backgimg.jpg";
import { adminlogin, adminsignup } from "./Services/Api";
import { useNavigate } from "react-router-dom";

export default function LogPg() {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsn] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

    setLoading(true);

    try {
      const data = await adminlogin({ username, password });
      localStorage.setItem("admintoken", data.userData.token);
      navigate("/Adashboard");
    } catch (error) {
      setLoading(true);
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await adminsignup({ username, password, confirmpassword });
      localStorage.setItem("admintoken", data.userData.token);
      navigate("/Adashboard");
    } catch (error) {
      setLoading(true);
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem("admintoken");
    };
    handleLogout();
  }, []);

  return (
    <Loading loading={loading}>
      <div
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex flex-col justify-center items-center">
          <div className="text-center mb-8">
            <p className="text-white text-4xl font-serif">
              Project Management System
            </p>
          </div>
          <div className="bg-white bg-opacity-60 p-8 rounded-lg shadow-lg w-80">
            <h2 className="text-2xl text-center mb-4">Admin</h2>
            <div className="flex gap-3 mb-5 justify-center">
              <button
                className="primary w-1/2 p-2 rounded-xl"
                onClick={handleSignInClick}
                style={signInButtonStyle}
              >
                SIGN IN
              </button>
              <button
                className="secondary w-1/2 p-2 rounded-xl"
                onClick={handleSignUpClick}
                style={signUpButtonStyle}
              >
                SIGN UP
              </button>
            </div>
            {showSignIn && (
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                  className="p-3 border rounded"
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsn(e.target.value)}
                />
                <input
                  className="p-3 border rounded"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bg-blue-500 text-white p-3 rounded">
                  Login
                </button>
              </form>
            )}
            {showSignUp && (
              <form onSubmit={handleSignup} className="flex flex-col gap-4">
                <input
                  className="p-3 border rounded"
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsn(e.target.value)}
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
                <button className="bg-blue-500 text-white p-3 rounded">
                  Register
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Loading>
  );
}
