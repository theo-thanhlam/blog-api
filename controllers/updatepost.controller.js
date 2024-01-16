require("dotenv").config();
const fs = require("fs");
const Post = require("../models/Post.models");
const connectDb = require("../utils/database.utils");
const jwt = require("jsonwebtoken");
const { updateImage } = require("../handlers/image.handlers");

async function updatePost(req, res) {
  try {
    await connectDb();
    const file = req.file;

    const { loginToken } = req.cookies;
    jwt.verify(loginToken, process.env.LOGIN_SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id, title, content } = req.body;
      const postDoc = await Post.findById(id);
      const isAuthor =
        JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(400).json("You are not the author of this post");
      }
      const newPath = await updateImage(postDoc.cover, file);
      // console.log(postDoc.cover);
      await postDoc.updateOne({
        title,
        content,
        cover: newPath ? newPath.coverUrl : postDoc.cover,
      });

      return res.status(200).json("Updated Post");
    });
  } catch (error) {
    return res.status(400).json("error");
  }
}

module.exports = updatePost;
