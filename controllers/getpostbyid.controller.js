const Post = require("../models/Post.models");
const connectDb = require("../utils/database.utils");

async function getPostById(req,res){
    try {
        await connectDb();
        const postId = req.params.id;
        const postDoc = await Post.findById(postId).populate('author',['name']);
        return res.status(200).json(postDoc);       
    }
    catch (error) {
        return res.status(400).json({msg:"Error"});
    }
        
   
    
}

module.exports = getPostById;