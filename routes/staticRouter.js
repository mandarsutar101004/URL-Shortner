const express = require("express");
const URL = require("../models/shortURL");
const { logoutUser } = require("../controllers/users");

const staticRouter = express.Router();

staticRouter.get("/", async (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  } else {
    const allURLs = await URL.find({ createdBy: req.user.id });
    return res.render("home", { urls: allURLs });
  }
});

staticRouter.get("/signup", (req, res) => {
  return res.render("signup");
});

staticRouter.get("/login", (req, res) => {
  return res.render("login");
});

staticRouter.get("/logout", logoutUser);

module.exports = staticRouter;
