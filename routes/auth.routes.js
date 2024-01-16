const express = require("express");
const register = require("../controllers/register.controller");
const login = require("../controllers/login.controller");
const logout = require("../controllers/logout.controller");
const requireLogin = require("../middleware/requireLogin.middleware");
const profile = require("../controllers/profile.controllers");
const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
  res.json({ msg: "Server opens" });
});

router.post("/register", (req, res) => {
  register(req, res);
});

router.post("/login", (req, res) => {
  login(req, res);
});

router.post("/logout", requireLogin, (req, res) => {
  logout(req, res);
});
router.get("/profile", (req, res) => {
  profile(req, res);
});

module.exports = router;
