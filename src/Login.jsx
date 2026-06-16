import { useState } from "react";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState("");

  const sendPhone = async () => {
    const res = await fetch("https://khafan-site.onrender.com/phone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone })
    });

    const data = await res.json();
    setUserId(data.id);

    alert("کد از طریق SMS برای شما ارسال شد");
    setStep(2);
  };

  const verifyCode = async () => {
    const res = await fetch("https://khafan-site.onrender.com/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, code })
    });

    const data = await res.json();

    if (data.ok) {
      alert("ورود موفق 🎉");
    } else {
      alert("کد اشتباه است");
    }
  };

  return (
    <div className="cyber-bg">
      <div className="overlay"></div>

      <div className="card">

        {step === 1 && (
          <>
            <h2>شماره موبایل</h2>
            <input
              placeholder="09xxxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button onClick={sendPhone}>ارسال کد</button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>کد را وارد کنید</h2>
            <input
              placeholder="کد 4 رقمی"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={verifyCode}>تایید</button>
          </>
        )}

      </div>
    </div>
  );
}