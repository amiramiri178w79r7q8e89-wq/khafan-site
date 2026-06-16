const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  phone: String,
  code: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);

// ارسال شماره + ساخت کد
app.post("/phone", async (req, res) => {
  try {
    const { phone } = req.body;

    const code = Math.floor(1000 + Math.random() * 9000).toString();

    const user = await User.create({
      phone,
      code
    });

    res.json({
      id: user._id,
      message: "code_sent"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// چک کردن کد
app.post("/verify", async (req, res) => {
  try {
    const { id, code } = req.body;

    const user = await User.findById(id);

    if (!user) return res.status(404).json({ error: "not found" });

    if (user.code === code) {
      return res.json({ ok: true });
    } else {
      return res.json({ ok: false });
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ادمین
app.get("/users", async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));