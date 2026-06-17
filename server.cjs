const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
  phone: String,
  code: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

app.post("/phone", async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        error: "phone required",
      });
    }

    const user = await User.create({
      phone,
      code: "",
    });

    res.json({
      id: user._id,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.post("/verify", async (req, res) => {
  try {
    const { id, code } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { code },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        ok: false,
        error: "user not found",
      });
    }

    res.json({
      ok: true,
      user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      ok: false,
      error: err.message,
    });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({
      createdAt: -1,
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});