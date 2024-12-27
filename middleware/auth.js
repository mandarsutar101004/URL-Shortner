const { getUserWithToken } = require("../service/auth");

async function restrictToLoginUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) {
    return res.redirect("/login");
  }
  const user = getUserWithToken(userUid);
  if (!user) {
    return res.redirect("/login");
  }
  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;
  const user = getUserWithToken(userUid);
  req.user = user;
  next();
}

module.exports = { restrictToLoginUserOnly, checkAuth };
