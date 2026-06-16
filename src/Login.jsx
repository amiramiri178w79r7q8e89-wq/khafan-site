import { useState } from "react";

export default function Login() {
  const [phone, setPhone] = useState("");

  const handlePhone = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 11);
    setPhone(value);
  };

  const submitPhone = () => {
    if (!/^09\d{9}$/.test(phone)) {
      alert("شماره معتبر نیست");
      return;
    }

    alert("شماره تایید شد");
  };

  return (
    <div className="cyber">
      <div className="overlay"></div>

      <div className="hero-card">
        <h2>ثبت شماره موبایل</h2>

        <input
          value={phone}
          onChange={handlePhone}
          placeholder="09xxxxxxxxx"
        />

        <button
          className="purple-btn"
          onClick={submitPhone}
        >
          ارسال کد
        </button>
      </div>
    </div>
  );
}