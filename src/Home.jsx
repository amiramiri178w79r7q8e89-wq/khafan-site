import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-bg">

      <div className="home-glow"></div>

      <div className="home-card">

        {/* عکس وسط */}
        <img
          className="home-img"
          src="https://fi1-ph.ypncdn.com/videos/202505/02/468061265/original/(m=eaSaaTbWx)(mh=ZYcC24OaVFTpvG-v)3.jpg"
          alt=""
        />

        <h1>🎮 ورود به بازی</h1>
        <p>برای شروع وارد ثبت نام شوید</p>

        <Link to="/register">
          <button>ثبت نام</button>
        </Link>

      </div>
    </div>
  );
}