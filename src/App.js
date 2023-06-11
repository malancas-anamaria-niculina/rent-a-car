import "./App.css";
import { Routes, Route } from "react-router-dom";
import Map from "./components/Map";
import DashboardWrapper from "./components/DashboardWrapper";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "./pages/Login/Login";
import CarActivity from "./components/CarActivity";
import Register from "./pages/Login/Register";
import PlannedActivity from "./components/PlannedActivity";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<DashboardWrapper />}>
            <Route exact path="/dashboard" element={<Map />} />
            <Route
              exact
              path="/planned-activity"
              element={<PlannedActivity />}
            />
            <Route exact path="/car-history" element={<CarActivity />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
