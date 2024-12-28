const express = require("express");
const { signUpUser, loginUser, logoutUser } = require("../controllers/users");

const userRouter = express.Router();

userRouter.post("/signup", signUpUser);

userRouter.post("/login", loginUser);

module.exports = userRouter;
