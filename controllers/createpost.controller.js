require('dotenv').config();
const fs = require('fs');
const Post = require('../models/Post.models');
const connectDb = require('../utils/database.utils');
const jwt = require('jsonwebtoken');

async function createPost(req,res){
    try {
        await connectDb();
        const {originalname,path} = req.file;
    
        const parts = originalname.split('.');
        const ext = parts[parts.length -1];//Get file extension
        const newPath = `${path}.${ext}`;//New path 
        fs.renameSync(path, newPath);//Change current file path to new Path
        
        const {loginToken} = req.cookies;
        jwt.verify(loginToken, process.env.LOGIN_SECRET, {}, async (err,info) =>{
            if(err) throw err;
            const {title, content} = req.body;
            const postDoc = await Post.create({
                title,
                content,
                cover:newPath,
                author:info.id
            });
            res.json(postDoc);
        });

       


    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"Error"})
        
    }
   


}
module.exports = createPost;