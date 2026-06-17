import { useState } from "react";

export default function Register() {
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) setPhone(value);
  };

  const sendPhone = () => {
    if (!phone.startsWith("09") || phone.length !== 11) {
      alert("شماره معتبر نیست");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1200);
  };

  const verifyCode = () => {
    if (code.length < 4) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1200);
  };

  return (
    <div className="bg">
      {/* STEP 0 */}
      {step === 0 && (
        <div className="card">
          <h1>ورود به بازی</h1>
          <button className="btn" onClick={() => setStep(1)}>
            شروع
          </button>
        </div>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <div className="card">
          <h2>شماره موبایل</h2>
          <input
            value={phone}
            onChange={handlePhoneChange}
            placeholder="09xxxxxxxxx"
            className="input"
          />
          <button className="btn" onClick={sendPhone}>
            ارسال کد
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="card">
          <h2>کد تایید</h2>
          <p className="hint">کد از طریق پیامک ارسال شد</p>

          <input
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="کد تایید"
            className="input"
          />

          <button className="btn" onClick={verifyCode}>
            تایید
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="card">
          <h2>ثبت نام انجام شد</h2>
          <p className="hint">در حال ورود به بازی...</p>
        </div>
      )}
    </div>
  );
}