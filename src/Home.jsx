import { Link } from "react-router-dom";
import hero from "./assets/hero.png";

export default function Home() {
  return (
    <div className="cyber">
      <div className="overlay"></div>

      <div className="hero-card">
        <img src={hero} alt="" className="hero-image" />

        <h1>ورود به بازی</h1>

        <p>
          برای ورود و دریافت کد وارد مرحله ثبت نام شوید
        </p>

        <Link to="/register">
          <button className="purple-btn">
            ثبت نام
          </button>
        </Link>
      </div>
    </div>
  );
}