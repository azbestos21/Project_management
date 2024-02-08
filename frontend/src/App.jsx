import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dash from "./Dashboard/Dash.jsx";
import Loginpg from "./StudAuth/Loginpg.jsx";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Loginpg />} />
      <Route path="/dashboard" element={<Dash />} />
    </Routes>
  );
}

export default App;
