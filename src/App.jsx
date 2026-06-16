import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Admin from "./Admin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Register (صفحه اصلی ثبت شماره + کد جدید) */}
        <Route path="/register" element={<Register />} />

        {/* اگر هنوز Login داری */}
        <Route path="/login" element={<Login />} />

        {/* Admin panel */}
        <Route path="/admin" element={<Admin />} />

      </Routes>
    </BrowserRouter>
  );
}