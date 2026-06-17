import { useEffect, useState } from "react";

export default function GameCode() {
  const [code, setCode] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("game_code") || "0000";
    setCode(saved);
  }, []);

  return (
    <div className="game">

      <h1>🔑 کد ورود شما</h1>

      <div className="code-box">
        {code}
      </div>

    </div>
  );
}