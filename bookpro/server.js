const express = require("express");
const cors = require("cors");

const app = express();

require("./db");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const bookRoutes = require("./routes/books");

app.use("/api/books", bookRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});