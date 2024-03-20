import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CSE from "../assets/CSE.jpeg";
import Backgimg from "../assets/Backgimg.jpg";
import RNSIT from "../assets/RNSIT.jpg";
import { Carousel } from "antd";
import { mentorlogin, mentorregister } from "./Services/Api.jsx";
export default function Login() {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [Name, setname] = useState();
  const [email, setUseremail] = useState();
  const [designation, setDesignation] = useState();
  const [phone, setPhoneNo] = useState();
  const [confirmpassword, setconfirmPassword] = useState();
  const navigate = useNavigate();
  console.log(username, password);
  console.log(
    username,
    password,
    confirmpassword,
    Name,
    email,
    phone,
    designation
  );
  const [signInButtonStyle, setSignInButtonStyle] = useState({
    backgroundImage: "linear-gradient(to right, #6a11cb 0%, #ff4b2b 100%)",
  });
  const [signUpButtonStyle, setSignUpButtonStyle] = useState({
    backgroundColor: "slate",
  });
  const handleSignInclick = () => {
    setShowSignIn(true);
    setShowSignUp(false);
    setSignInButtonStyle({
      backgroundColor: "slate ",
      backgroundImage: "linear-gradient(to right, #6a11cb 0%, #ff4b2b 100%)",
    });
    setSignUpButtonStyle({ backgroundColor: "slate" });
  };
  const handleSignUpclick = () => {
    setShowSignUp(true);
    setShowSignIn(false);
    setSignInButtonStyle({ backgroundColor: "slate" });
    setSignUpButtonStyle({
      backgroundColor: "slate",
      backgroundImage: "linear-gradient(to right, #6a11cb 0%, #ff4b2b 100%)",
    });
  };
  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const data = await mentorlogin({ username, password });
      console.log(data);
      localStorage.setItem("Mentortoken", data.userData.token);
      navigate("/Mdashboard");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const data = await mentorregister({
        username,
        password,
        confirmpassword,
        Name,
        email,
        phone,
        designation,
      });
      console.log(data);
      localStorage.setItem("Mentortoken", data.userData.token);
      navigate("/Mdashboard");
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
    <div className="w-full h-screen flex flex-row">
      <div className="w-1/2 h-screen flex flex-col justify-start items-center bg-slate-50">
        <h2 className="text-2xl text-center m-2">Mentor</h2>
        <div className="flex gap-3 my-4">
          <div className="bg-slate-50 rounded-2xl">
            <button
              className="primary w-full h-full p-2 rounded-3xl"
              onClick={handleSignInclick}
              style={signInButtonStyle}
            >
              SIGN IN
            </button>
          </div>
          <div className="rounded-2xl bg-slate-50">
            <button
              className="w-full h-full p-2 rounded-3xl"
              onClick={handleSignUpclick}
              style={signUpButtonStyle}
            >
              SIGN UP
            </button>
          </div>
        </div>
        {showSignIn && (
          <div className="w-full">
            <form
              onSubmit={handlelogin}
              className="max-w-md mx-auto flex flex-col gap-8 p-3"
            >
              <input
                className="p-3 border-none"
                type="text"
                placeholder={"Mentro_Id"}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="p-3 border-none"
                type="password"
                placeholder={"password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="bg-blue-300 p-3">Login</button>
            </form>
          </div>
        )}
        {showSignUp && (
          <div className="w-full">
            <form
              className="max-w-md mx-auto flex flex-col gap-1 p-3"
              onSubmit={handleSignup}
            >
              <input
                className="p-3 border-none"
                type="text"
                placeholder={"MentorId"}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="p-3 border-none"
                type="text"
                placeholder={"Name"}
                onChange={(e) => setname(e.target.value)}
              />
              <input
                className="p-3 border-none"
                type="email"
                placeholder={"your@email.com"}
                onChange={(e) => setUseremail(e.target.value)}
              />
              <input
                className="p-3 border-none"
                type="text"
                placeholder={"Phone_no"}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
              <input
                className="p-3 border-none"
                type="text"
                placeholder={"Designation"}
                onChange={(e) => setDesignation(e.target.value)}
              />

              <input
                className="p-3 border-none"
                type="password"
                placeholder={"password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="p-3 border-none"
                type="password"
                placeholder={"Confirm Password"}
                onChange={(e) => setconfirmPassword(e.target.value)}
              />

              <button className="bg-blue-300 p-2">Register</button>
            </form>
          </div>
        )}
      </div>
      <div className="w-1/2 h-screen">
        {" "}
        <Carousel autoplay>
          <div className="bg-orange-300 w-1/2 h-screen ">
            <img src={RNSIT} className="w-11/12 h-72 ml-7 mt-7" />
            <div className="ml-9 mt-7">
              <p className="text-white text-4xl font-serif text-center ">
                "Your First Step to a Brighter Future."
              </p>
            </div>
          </div>
          <div className="bg-purple-300 w-1/2 h-screen ">
            <img src={Backgimg} className="w-11/12 h-72 ml-7 mt-7" />
            <div className="ml-9 mt-7">
              <p className="text-white text-4xl font-serif text-center ">
                "Lush Green Campus with Top Placement Opportunities"
              </p>
            </div>
          </div>
          <div className="bg-teal-500 w-1/2 h-screen ">
            <img src={CSE} className="w-11/12 h-60 ml-7 mt-7" />
            <div className="ml-9 mt-7">
              <p className="text-white text-4xl font-serif text-center ">
                "Preparing Better Computer Professionals for a Real World"
              </p>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
}
