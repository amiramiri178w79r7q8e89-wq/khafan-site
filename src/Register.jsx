import { useState } from "react";

export default function Register() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const playClick = () => {
    const audio = new Audio("/click.mp3");
    audio.play();
  };

  const handleStart = () => {
    playClick();
    setStep(2);
  };

  const sendPhone = () => {
    if (phone.length !== 11) {
      setMessage("شماره معتبر نیست");
      return;
    }

    setLoading(true);
    playClick();

    setTimeout(() => {
      setLoading(false);
      setMessage("کد تأیید از طریق پیامک ارسال شد");
      setStep(3);
    }, 2000);
  };

  const verifyCode = () => {
    setLoading(true);
    playClick();

    setTimeout(() => {
      setLoading(false);
      setMessage("ثبت نام شما انجام شد / در حال ورود به بازی...");
      setStep(4);
    }, 2000);
  };

  return (
    <div className="container">

      {step === 1 && (
        <div className="card">
          <h1>ورود به بازی</h1>
          <button onClick={handleStart}>شروع</button>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <h2>شماره موبایل</h2>

          <input
            value={phone}
            placeholder="09xxxxxxxxx"
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, "");
              setPhone(val);
            }}
            maxLength={11}
          />

          <button onClick={sendPhone}>ثبت</button>
          <p>{message}</p>
        </div>
      )}

      {step === 3 && (
        <div className="card">
          <h2>کد تایید را وارد کنید</h2>

          <input
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
            maxLength={6}
          />

          <button onClick={verifyCode}>تایید</button>
          <p>{message}</p>
        </div>
      )}

      {step === 4 && (
        <div className="card">
          <h2 className="glitch">در حال ورود به بازی...</h2>
          <div className="loader"></div>
        </div>
      )}

      {loading && <div className="overlay">Loading...</div>}
    </div>
  );
}