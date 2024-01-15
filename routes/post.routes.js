const express = require("express");
const {
  uploadMiddleware,
} = require("../middleware/postCoverUpload.middleware");
const requireLogin = require("../middleware/requireLogin.middleware");
const createPost = require("../controllers/createpost.controller");
const getPosts = require("../controllers/getpost.controller");
const getPostById = require("../controllers/getpostbyid.controller");
const updatePost = require("../controllers/updatepost.controller");
const router = express.Router();
router.use(express.json());

router.post(
  "/create",
  [requireLogin, uploadMiddleware.single("file")],
  (req, res) => {
    createPost(req, res);
  }
);

router.get("/", (req, res) => {
  getPosts(req, res);
});

router.get("/:id", (req, res) => {
  getPostById(req, res);
});

router.put("/", uploadMiddleware.single("file"), async (req, res) => {
  updatePost(req, res);
});

module.exports = router;
