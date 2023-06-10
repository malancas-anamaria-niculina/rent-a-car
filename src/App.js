import "./App.css";
import { Routes, Route } from "react-router-dom";
import Map from "./components/Map";
import DashboardWrapper from "./components/DashboardWrapper";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "./pages/Login/Login";
import CarActivity from "./components/CarActivity"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<DashboardWrapper />}>
            <Route exact path="/dashboard" element={<Map />} />
          </Route>
        </Route>
        <Route path="/carHistory" element={<CarActivity />} />
      </Routes>
    </div>
  );
}

export default App;
