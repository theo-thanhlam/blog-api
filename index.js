const express = require("express");
const app = express();
const cors = require("cors");
const register = require("./controllers/register.controller");
const login = require("./controllers/login.controller");
const cookiesParser = require("cookie-parser");
const loginTokenAuth = require("./auth/loginToken.auth");
const logout = require("./controllers/logout.controller");
const createPost = require("./controllers/createpost.controller");
const getPosts = require("./controllers/getpost.controller");
const multer = require("multer");
const getPostById = require("./controllers/getpostbyid.controller");
const updatePost = require("./controllers/updatepost.controller");
const uploadMiddleware = multer({
  dest: "uploads/",
  limits: {
    fieldSize: 25 * 1024 * 1024,
  },
});

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());
app.use(cookiesParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.get("/", (req, res) => {
  res.json({ msg: "Server opens" });
});

app.post("/register", (req, res) => {
  register(req, res);
});

app.post("/login", (req, res) => {
  login(req, res);
});

app.get("/profile", (req, res) => {
  loginTokenAuth(req, res);
});

app.post("/logout", (req, res) => {
  logout(req, res);
});

app.post("/create-post", uploadMiddleware.single("file"), (req, res) => {
  createPost(req, res);
});

app.get("/post", (req, res) => {
  getPosts(req, res);
});

app.get("/post/:id", (req, res) => {
  getPostById(req, res);
});

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  updatePost(req, res);
});

app.listen(3001);
