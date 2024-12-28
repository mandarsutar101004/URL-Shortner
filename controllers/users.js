const users = require("../models/users");
// const { v4 } = require("uuid");
const { setUserWithToken } = require("../service/auth");

async function signUpUser(req, res) {
  const body = req.body;
  await users.create({
    username: body.username,
    email: body.email,
    password: body.password,
  });
  return res.redirect("/login");
}

async function loginUser(req, res) {
  const body = req.body;
  const email = body.email;
  const password = body.password;
  const user = await users.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  } else {
    const token = setUserWithToken(user); //creating token while login
    res.cookie("uid", token); //creating cookie in res (params - name of cookie and token created while setUser function)
    return res.redirect("/");
  }
}

function logoutUser(req, res) {
  res.clearCookie("uid");
  return res.redirect("/login");
}

module.exports = { signUpUser, loginUser, logoutUser };
