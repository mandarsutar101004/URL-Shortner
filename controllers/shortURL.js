const shortid = require("shortid");
const URL = require("../models/shortURL");
const { getUserWithToken } = require("../service/auth");

async function createShortURL(req, res) {
  const userUid = req.cookies?.uid;
  const user = getUserWithToken(userUid);
  const id = user.id;
  const body = req.body;
  if (!body.originalURL) {
    return res.status(400).json({ Error: " Original Url Required" });
  } else {
    const shortID = shortid();
    await URL.create({
      shortID: shortID,
      originalURL: body.originalURL,
      totalClicks: [],
      createdBy: id,
    });
    return res.render("home", {
      id: shortID,
    });
    // res.json({ Msg: "URL Created Successfully", id: shortID });
  }
}

async function findShortIdAndRedirect(req, res) {
  const shortID = req.params.shortID;
  const entry = await URL.findOneAndUpdate(
    { shortID },
    {
      /*$ push to push in array */ $push: {
        totalClicks: {
          timestamp: Date.now(),
        },
      },
    }
  );
  return res.redirect(entry.originalURL);
}

async function analyseURL(req, res) {
  const shortID = req.params.shortID;
  const result = await URL.findOne({ shortID });
  return res.json({
    totalClicks: result.totalClicks.length,
    analytics: result.totalClicks,
  });
}

module.exports = { createShortURL, findShortIdAndRedirect, analyseURL };
