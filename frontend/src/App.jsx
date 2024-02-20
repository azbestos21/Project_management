import "./App.css";
import { Route, Routes } from "react-router-dom";

import Loginpg from "./StudAuth/Loginpg.jsx";
import { PrivateRoute } from "./StudAuth/privateroute.jsx";
import Login from "./MentorAuth/Login.jsx";
import { PrivateMentRoute } from "./MentorAuth/PrivateMentRoute.jsx";

import MyMentees from "./MentorPages/MyMentees.jsx";
import MProjects from "./MentorPages/MProjects.jsx";
import Multipage from "./MentorPages/Multipage.jsx";
import MDashboard from "./MentorPages/MDashboard.jsx";
import SDashboard from "./StudentPages/SDashboard.jsx";

import MulPages from "./StudentPages/MulPages.jsx";
import Sprojects from "./StudentPages/Sprojects.jsx";
import Smentor from "./StudentPages/Smentor.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<MulPages />}>
          <Route path="/dashboard" element={<SDashboard />} />
          <Route path="/MyProjects" element={<Sprojects />} />
          <Route path="/Mentor" element={<Smentor />} />
        </Route>
        <Route path="/dashboard" element={<SDashboard />} />
      </Route>
      <Route path="/login" element={<Loginpg />} />
      <Route path="/Mlogin" element={<Login />} />
      <Route path="/" element={<PrivateMentRoute />}>
        <Route path="/" element={<Multipage />}>
          <Route path="/Mdashboard" element={<MDashboard />} />
          <Route path="/Mymentees" element={<MyMentees />} />
          <Route path="/Mprojects" element={<MProjects />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
