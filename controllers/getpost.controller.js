const Post = require("../models/Post.models");
const connectDb = require("../utils/database.utils");


async function getPosts(req,res){
    try {
        await connectDb();
        const posts = await Post.find().populate("author",['email','name']).sort({createdAt:-1}).limit(20);
        
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(400).json({msg:"Error"})        
    }

    
}

module.exports = getPosts;