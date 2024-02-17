import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dash from "./Dashboard/Dash.jsx";
import Loginpg from "./StudAuth/Loginpg.jsx";
import { PrivateRoute } from "./StudAuth/privateroute.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dash />} />
      </Route>
      <Route path="/login" element={<Loginpg />} />
    </Routes>
  );
}

export default App;
