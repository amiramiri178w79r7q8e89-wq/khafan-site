import { useState } from "react";
import { motion } from "framer-motion";

export default function Register() {
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const click = () => {
    new Audio("/click.mp3").play();
  };

  const startGame = () => {
    click();
    setStep(1);
  };

  const sendPhone = () => {
    if (phone.length !== 11) {
      setMsg("شماره اشتباه است");
      return;
    }

    click();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setMsg("کد تایید از طریق پیامک ارسال شد");
      setStep(2);
    }, 2000);
  };

  const verifyCode = () => {
    click();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="container">

      {/* START SCREEN */}
      {step === 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="card"
        >
          <h1 className="glow">GTA LOGIN</h1>
          <button onClick={startGame}>START</button>
        </motion.div>
      )}

      {/* PHONE */}
      {step === 1 && (
        <motion.div className="card"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h2>شماره موبایل</h2>

          <input
            value={phone}
            placeholder="09xxxxxxxxx"
            onChange={(e) =>
              setPhone(e.target.value.replace(/[^0-9]/g, ""))
            }
            maxLength={11}
          />

          <button onClick={sendPhone}>ارسال کد</button>
          <p>{msg}</p>
        </motion.div>
      )}

      {/* OTP */}
      {step === 2 && (
        <motion.div className="card"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <h2>کد تایید را وارد کنید</h2>

          <input
            value={code}
            onChange={(e) =>
              setCode(e.target.value.replace(/[^0-9]/g, ""))
            }
            maxLength={6}
          />

          <button onClick={verifyCode}>تایید</button>
          <p>{msg}</p>
        </motion.div>
      )}

      {/* ENTER GAME */}
      {step === 3 && (
        <motion.div
          className="card"
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <h2 className="glitch">ثبت نام شما انجام شد</h2>
          <p>در حال ورود به بازی...</p>
          <div className="loader"></div>
        </motion.div>
      )}

      {loading && <div className="overlay">LOADING...</div>}
    </div>
  );
}