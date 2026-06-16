import { useState } from "react";

export default function Login() {
const [phone, setPhone] = useState("");

const handlePhone = (e) => {
const value = e.target.value.replace(/\D/g, "").slice(0, 11);
setPhone(value);
};

const submitPhone = async () => {
if (!/^09\d{9}$/.test(phone)) {
alert("شماره معتبر نیست");
return;
}

```
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

  if (!res.ok) {
    throw new Error("Server Error");
  }

  const data = await res.json();

  localStorage.setItem("userId", data.id);

  alert("نسخه جدید V2 - شماره در دیتابیس ذخیره شد");

  console.log("User Saved:", data);

} catch (err) {
  console.error(err);
  alert("خطا در اتصال به Render");
}
```

};

return ( <div className="cyber"> <div className="overlay"></div>

```
  <div className="hero-card">
    <h2>ثبت شماره موبایل</h2>

    <input
      type="tel"
      value={phone}
      onChange={handlePhone}
      placeholder="09xxxxxxxxx"
    />

    <button
      className="purple-btn"
      onClick={submitPhone}
    >
      ارسال کد
    </button>
  </div>
</div>
```

);
}
