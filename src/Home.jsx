import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">

      <div className="bg"></div>

      <div className="card">

        <img
          src="https://fi1-ph.ypncdn.com/videos/202505/02/468061265/original/(m=eaSaaTbWx)(mh=ZYcC24OaVFTpvG-v)3.jpg"
          className="avatar"
        />

        <h1>🎮 ورود به بازی</h1>
        <p>برای شروع ثبت نام کنید</p>

        <Link to="/register">
          <button>ثبت نام</button>
        </Link>

      </div>

    </div>
  );
}