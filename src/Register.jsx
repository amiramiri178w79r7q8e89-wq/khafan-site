import { useState } from "react";
import { motion } from "framer-motion";

export default function Register() {
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const click = () => {
    const audio = new Audio("/click.mp3");
    audio.volume = 0.3;
    audio.play();
  };

  const typeText = (text, cb) => {
    let i = 0;
    cb("");
    const interval = setInterval(() => {
      cb(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 25);
  };

  const start = () => {
    click();
    setStep(1);
  };

  const sendPhone = () => {
    if (phone.length !== 11) {
      typeText("شماره نامعتبر است", setMsg);
      return;
    }

    click();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      typeText("کد تایید از طریق پیامک برای شما ارسال شد...", setMsg);
      setStep(2);
    }, 2000);
  };

  const verify = () => {
    click();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="container">

      {step === 0 && (
        <motion.div
          className="card"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <h1 className="title">GTA ONLINE</h1>
          <p className="subtitle">MISSION LOGIN START</p>
          <button onClick={start}>START MISSION</button>
        </motion.div>
      )}

      {step === 1 && (
        <motion.div className="card"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h2>ENTER PHONE</h2>
          <input
            value={phone}
            placeholder="09XXXXXXXXX"
            onChange={(e) =>
              setPhone(e.target.value.replace(/[^0-9]/g, ""))
            }
            maxLength={11}
          />
          <button onClick={sendPhone}>SEND CODE</button>
          <p className="msg">{msg}</p>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div className="card"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <h2>ENTER CODE</h2>
          <input
            value={code}
            onChange={(e) =>
              setCode(e.target.value.replace(/[^0-9]/g, ""))
            }
            maxLength={6}
          />
          <button onClick={verify}>VERIFY</button>
          <p className="msg">{msg}</p>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div className="card"
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <h2 className="glitch">ثبت نام شما انجام شد</h2>
          <p>در حال ورود به بازی...</p>
          <div className="loader"></div>
        </motion.div>
      )}

      {loading && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}