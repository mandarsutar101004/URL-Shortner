const express = require("express");
const {
  createShortURL,
  findShortIdAndRedirect,
  analyseURL,
} = require("../controllers/shortURL");

const urlRouter = express.Router();

urlRouter.post("/", createShortURL);

urlRouter.get("/:shortID", findShortIdAndRedirect);

urlRouter.get("/analytics/:shortID", analyseURL);

module.exports = urlRouter;
