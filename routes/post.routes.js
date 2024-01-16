const express = require("express");
const { upload } = require("../middleware/upload.middlewares");
const requireLogin = require("../middleware/requireLogin.middleware");
const createPost = require("../controllers/createpost.controller");
const getPosts = require("../controllers/getpost.controller");
const getPostById = require("../controllers/getpostbyid.controller");
const updatePost = require("../controllers/updatepost.controller");
const router = express.Router();
router.use(express.json());

router.post("/create", [upload.single("file")], (req, res) => {
  createPost(req, res);
});

router.get("/", (req, res) => {
  getPosts(req, res);
});

router.get("/:id", (req, res) => {
  getPostById(req, res);
});

router.put("/", [requireLogin, upload.single("file")], async (req, res) => {
  updatePost(req, res);
});

module.exports = router;
