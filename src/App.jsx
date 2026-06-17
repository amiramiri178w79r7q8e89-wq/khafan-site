import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg"></div>
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}