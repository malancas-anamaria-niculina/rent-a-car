import "./App.css";
import { Routes, Route } from "react-router-dom";
import Map from "./Components/Map";
import Login from "./Components/Login";

function App() {
  return (
    <div className="App">
      <header>
        <h3>Routes</h3>
      </header>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </div>
  );
}

export default App;
