import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import bg from "../assets/rns1.jpg";

export default function HomePage() {
  const [role, setRole] = useState(""); // Track the selected role
  const [code, setCode] = useState(""); // Track the entered code
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Codes for each role (these should be securely stored elsewhere in real-world applications)
  const codes = {
    student: "student123", // Example code for students
    mentor: "mentor123",   // Example code for mentors
    admin: "admin123"      // Example code for admins
  };

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole); // Set the role when a button is clicked
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if the entered code matches the role
    if (codes[role] === code) {
      setTimeout(() => {
        setLoading(false);
        // Redirect to the appropriate dashboard based on role
        if (role === "student") navigate("/login");
        if (role === "mentor") navigate("/mlogin");
        if (role === "admin") navigate("/alogin");
      }, 1000);
    } else {
      setLoading(false);
      alert("Incorrect code. Please try again.");
    }
  };

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

          {/* Role selection buttons */}
          {!role && (
            <div className="bg-white bg-opacity-60 p-8 rounded-lg shadow-lg w-80 text-center">
              <h2 className="text-2xl mb-4 text-center">Continue As</h2>
              <div className="flex gap-3 mb-5 justify-center">
                <button
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                  onClick={() => handleRoleSelection("student")}
                >
                  Student
                </button>
                <button
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                  onClick={() => handleRoleSelection("mentor")}
                >
                  Mentor
                </button>
                <button
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                  onClick={() => handleRoleSelection("admin")}
                >
                  Admin
                </button>
              </div>
            </div>
          )}

          {/* Enter the code after selecting a role */}
          {role && (
            <div className="bg-white bg-opacity-60 p-8 rounded-lg shadow-lg w-80 text-center">
              <h2 className="text-2xl mb-4">Enter Code for {role}</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  className="p-3 border rounded"
                  type="password"
                  placeholder="Enter your code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </Loading>
  );
}
