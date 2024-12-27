const jwt = require("jsonwebtoken");
const secretKey = "Mandar@123Sutar#10s";

function setUserWithToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    secretKey
  );
}

function getUserWithToken(token) {
  if (!token) {
    return null;
  }
  return jwt.verify(token, secretKey);
}

module.exports = {
  setUserWithToken,
  getUserWithToken,
};
