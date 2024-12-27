const express = require("express");
const path = require("path");
const { connectMongoDB } = require("./Connection");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/userRouters");
const urlRouter = require("./routes/urlRouters");
const cookieParser = require("cookie-parser");
const { restrictToLoginUserOnly, checkAuth } = require("./middleware/auth");

const app = express();
const PORT = 8011;

//Connecting DB
connectMongoDB("mongodb://127.0.0.1:27017/JWT-Authentication")
  .then(() => {
    console.log("MongoDB Conected");
  })
  .catch((err) => {
    console.log("Error :", err);
  });

//EJS Setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes
app.use("/url", restrictToLoginUserOnly, urlRouter);
app.use("/", checkAuth, staticRouter);
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server Started at port : ${PORT} `));
