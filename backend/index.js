const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

require("./db");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Todo App");
});

app.listen(port, () => {
  console.log(`Server chạy tại http://localhost:${port}`);
});
