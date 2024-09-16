import "./App.css";
import { Route, Routes } from "react-router-dom";

import Loginpg from "./StudAuth/Loginpg.jsx";
import { PrivateRoute } from "./StudAuth/PrivateRoute.jsx";
import Login from "./MentorAuth/Login.jsx";
import { PrivateMentRoute } from "./MentorAuth/PrivateMentRoute.jsx";
import LogPg from "./AdminAuth/logPg.jsx";
import { PrivateRouter } from "./AdminAuth/PrivateRoute.jsx";

import MyMentees from "./MentorPages/MyMentees.jsx";
import MProjects from "./MentorPages/MProjects.jsx";
import Multipage from "./MentorPages/Multipage.jsx";
import MDashboard from "./MentorPages/MDashboard.jsx";
import Actions from "./Adminpages/CreateProject.jsx";
import Assign from "./Adminpages/Assign.jsx";
import SDashboard from "./StudentPages/Sdashboard.jsx";
import MulPages from "./StudentPages/MulPages.jsx";
import Sprojects from "./StudentPages/Sprojects.jsx";
import Smentor from "./StudentPages/Smentor.jsx";
import SCalendar from "./StudentPages/SCalendar.jsx";
import MCalendar from "./MentorPages/MCalendar.jsx";
import ACalendar from "./Adminpages/ACalender.jsx";
import ADashboard from "./Adminpages/ADashboard.jsx";
import VerifyAdmin from "./AdminAuth/email.jsx";
import HomePage from "./Adminpages/Home.jsx"; // New HomePage for role selection

function App() {
  return (
    <Routes>
      {/* HomePage is now the default landing page */}
      <Route path="/home" element={<HomePage />} />

      {/* Student Routes */}
      <Route path="/login" element={<Loginpg />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<MulPages />}>
          <Route path="/dashboard" element={<SDashboard />} />
          <Route path="/MyProjects" element={<Sprojects />} />
          <Route path="/Mentor" element={<Smentor />} />
          <Route path="/SCalendar" element={<SCalendar />} />
        </Route>
      </Route>

      {/* Mentor Routes */}
      <Route path="/Mlogin" element={<Login />} />
      <Route path="/" element={<PrivateMentRoute />}>
        <Route path="/" element={<Multipage />}>
          <Route path="/Mdashboard" element={<MDashboard />} />
          <Route path="/Mymentees" element={<MyMentees />} />
          <Route path="/Mprojects" element={<MProjects />} />
          <Route path="/MCalendar" element={<MCalendar />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route path="/Alogin" element={<LogPg />} />
      <Route path="/verify-admin" element={<VerifyAdmin />} />
      <Route path="/" element={<PrivateRouter />}>
        <Route path="/" element={<Multipage />}>
          <Route path="/Adashboard" element={<ADashboard />} />
          <Route path="/ACalendar" element={<ACalendar />} />
          <Route path="/Assign" element={<Assign />} />
          <Route path="/CreateProject" element={<Actions />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
