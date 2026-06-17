import { useState } from "react";

export default function Register() {
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const onlyNumber = (v) => v.replace(/\D/g, "");

  const sendPhone = () => {
    if (!phone.startsWith("09") || phone.length !== 11) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const verify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1500);
  };

  return (
    <div className="bg">

      {/* STEP 0 */}
      {step === 0 && (
        <div className="card">
          <h2 className="typing">ورود به بازی...</h2>
          <button className="btn" onClick={() => setStep(1)}>
            شروع
          </button>
        </div>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <div className="card">
          <h3>شماره موبایل را وارد کنید</h3>

          <input
            className="input"
            value={phone}
            onChange={(e) => setPhone(onlyNumber(e.target.value))}
            maxLength={11}
            placeholder="09xxxxxxxxx"
          />

          <button className="btn" onClick={sendPhone}>
            ارسال کد
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="card">
          <h3 className="typing">کد تایید ارسال شد...</h3>

          <input
            className="input"
            value={code}
            onChange={(e) => setCode(onlyNumber(e.target.value))}
            placeholder="کد تایید"
          />

          <button className="btn" onClick={verify}>
            تایید
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="card">
          <h3 className="typing">ثبت نام شما انجام شد</h3>
          <p>در حال ورود به بازی...</p>
          <div className="loader"></div>
        </div>
      )}

      {/* LOADING OVERLAY */}
      {loading && (
        <div className="card">
          <div className="loader"></div>
          <p className="typing">در حال پردازش...</p>
        </div>
      )}

    </div>
  );
}