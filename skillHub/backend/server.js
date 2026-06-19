require("dotenv").config();

const express = require("express");

const cors = require("cors");

const connectDB = require("./config/db");

const courseRoutes = require("./routes/courseRoutes");

const contactRoutes = require("./routes/contactRoutes");

const app = express();

// DATABASE CONNECTION

connectDB();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("SkillHub Backend Running");
});
app.use("/api/courses", courseRoutes);
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
