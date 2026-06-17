import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Register() {
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const clickSound = new Audio("/ui-click.wav");
  const hoverSound = new Audio("/modern-ui-hover.wav");
  const typingSound = new Audio("/keyboard-typing.wav");
  const successSound = new Audio("/beep3.wav");
  const errorSound = new Audio("/error.wav");
  const scannerSound = new Audio("/scanner.wav");

  useEffect(() => {
    const bgMusic = new Audio("/cyber-road.mp3");

    bgMusic.loop = true;
    bgMusic.volume = 0.15;

    const startMusic = () => {
      bgMusic.play().catch(() => {});
      window.removeEventListener("click", startMusic);
    };

    window.addEventListener("click", startMusic);

    return () => {
      bgMusic.pause();
    };
  }, []);

  const onlyNumbers = (value, max) => {
    return value.replace(/\D/g, "").slice(0, max);
  };

  const sendPhone = async () => {
    if (phone.length !== 11 || !phone.startsWith("09")) {
      errorSound.play();
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

      successSound.play();

      setStep(2);
    } catch (err) {
      console.error(err);

      setLoading(false);

      errorSound.play();

      alert("خطا در اتصال به سرور");
    }
  };

  const verifyCode = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      errorSound.play();
      alert("شناسه کاربر پیدا نشد");
      return;
    }

    if (code.length < 4) {
      errorSound.play();
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

      setLoading(false);

      if (data.ok) {
        successSound.play();
        setStep(3);
      } else {
        errorSound.play();
        alert("کد اشتباه است");
      }
    } catch (err) {
      console.error(err);

      setLoading(false);

      errorSound.play();

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

            <img
              src="/logo.png"
              alt=""
              style={{
                width: "120px",
                marginBottom: "20px",
              }}
            />

            <button
              className="btn"
              onMouseEnter={() => hoverSound.play()}
              onClick={() => {
                clickSound.play();
                setStep(1);
              }}
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
              onChange={(e) => {
                typingSound.currentTime = 0;
                typingSound.play();

                setPhone(
                  onlyNumbers(
                    e.target.value,
                    11
                  )
                );
              }}
            />

            <button
              className="btn"
              onMouseEnter={() => hoverSound.play()}
              onClick={() => {
                clickSound.play();
                scannerSound.play();
                sendPhone();
              }}
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
              onChange={(e) => {
                typingSound.currentTime = 0;
                typingSound.play();

                setCode(
                  onlyNumbers(
                    e.target.value,
                    6
                  )
                );
              }}
            />

            <button
              className="btn"
              onMouseEnter={() => hoverSound.play()}
              onClick={() => {
                clickSound.play();
                verifyCode();
              }}
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
              scale: 1.2,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
          >
            <h2>ثبت نام شما انجام شد</h2>

            <p>
              در حال ورود به بازی...
            </p>
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