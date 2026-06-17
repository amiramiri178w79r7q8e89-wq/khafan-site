import { useState } from "react";

export default function Register() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState("");

  const sendPhone = async () => {
    if (!/^09\d{9}$/.test(phone)) return alert("شماره اشتباهه");

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

    alert("ثبت شد");
  };

  return (
    <div className="bg">
      <div className="card">
        <h1>ورود به بازی</h1>

        {step === 1 && (
          <>
            <input
              placeholder="09xxxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button onClick={sendPhone}>ثبت نام</button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              placeholder="کد تایید"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={sendCode}>تایید</button>
          </>
        )}
      </div>
    </div>
  );
}