// middleware/requireLogin.js

const jwt = require("jsonwebtoken");

function requireLogin(req, res, next) {
  const { loginToken } = req.cookies;

  if (!loginToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Login token missing" });
  }

  jwt.verify(loginToken, process.env.LOGIN_SECRET, {}, (err, info) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid login token" });
    }

    // Attach the decoded information to the request object for future middleware/routes
    req.userInfo = info;

    // Continue to the next middleware/route
    next();
  });
}

module.exports = requireLogin;
