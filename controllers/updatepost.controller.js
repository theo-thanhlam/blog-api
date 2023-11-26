require("dotenv").config();
const fs = require("fs");
const Post = require("../models/Post.models");
const connectDb = require("../utils/database.utils");
const jwt = require("jsonwebtoken");

async function updatePost(req, res) {
  await connectDb();
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;

    const parts = originalname.split(".");
    const ext = parts[parts.length - 1]; //Get file extension
    newPath = `${path}.${ext}`; //New path
    fs.renameSync(path, newPath); //Change current file path to new Path
  }
  const { loginToken } = req.cookies;
  jwt.verify(loginToken, process.env.LOGIN_SECRET, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("You are not the author of this post");
    }
    await postDoc.updateOne({
      title,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    return res.status(200).json("Updated Post");
  });
}

module.exports = updatePost;
