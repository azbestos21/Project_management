import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dash from "./Dashboard/Dash.jsx";
import Loginpg from "./StudAuth/Loginpg.jsx";
import { PrivateRoute } from "./StudAuth/privateroute.jsx";
import Login from "./MentorAuth/Login.jsx";
import { PrivateMentRoute } from "./MentorAuth/PrivateMentRoute.jsx";
import MDashboard from "./MentorPages/MDashboard.jsx";
import MyMentees from "./MentorPages/MyMentees.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dash />} />
      </Route>
      <Route path="/login" element={<Loginpg />} />
      <Route path="/Mlogin" element={<Login />} />
      <Route path="/" element={<PrivateMentRoute />}>
        <Route path="/Mdashboard" element={<MDashboard />} />
      </Route>
      <Route path="/Mymentees" element={<MyMentees />} />
    </Routes>
  );
}

export default App;
