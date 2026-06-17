import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Admin from "./Admin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}