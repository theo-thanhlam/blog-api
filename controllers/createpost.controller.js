require("dotenv").config();
const fs = require("fs");
const Post = require("../models/Post.models");
const connectDb = require("../utils/database.utils");
const jwt = require("jsonwebtoken");
const { uploadImage, getCoverUrl } = require("../handlers/image.handlers");

async function createPost(req, res) {
  try {
    await connectDb();

    const coverImageFile = req.file;
    const uploadResult = await uploadImage(coverImageFile);
    const { loginToken } = req.cookies;
    jwt.verify(loginToken, process.env.LOGIN_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { title, content } = req.body;
      const postDoc = await Post.create({
        title,
        content,
        cover: uploadResult.coverUrl,
        author: info.id,
      });
      return res.status(200).json({ msg: "Post created" });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Error" });
  }
}
module.exports = createPost;
