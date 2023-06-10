import "./App.css";
import { Routes, Route } from "react-router-dom";
import Map from "./Components/Map";

function App() {
  return (
    <div className="App">
      <header>
        <h3>Routes</h3>
      </header>
      <Routes>
        {/* <Route path="/home" element={<Map />} /> */}
        <Route path="/map" element={<Map />} />
      </Routes>
    </div>
  );
}

export default App;
