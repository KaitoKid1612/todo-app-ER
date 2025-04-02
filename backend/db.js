const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost/todo-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Kết nối MongoDB thành công"))
  .catch((err) => console.error("Lỗi:", err));
