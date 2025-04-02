const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

require("./db");
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.listen(port, () => {
  console.log(`Server chạy tại http://localhost:${port}`);
});
