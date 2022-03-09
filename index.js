const express = require("express");
const app = express();
const PORT = 8000;
// routers
const usersRouter = require("./routers/usersRouter");

// Middlewares
app.use(express.json());
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log("Listening to PORT", PORT);
});
