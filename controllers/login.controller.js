const User = require("../models/User.models");
const connectDb = require("../utils/database.utils");
const bcrypt = require('bcryptjs')

const jwt= require('jsonwebtoken');

async function login(req, res) {
    try {
        await connectDb();
        const {email, password} = req.body;
        const userDoc = await User.findOne({email});
        
        //No User Exists
        if(userDoc === null) return res.status(400).json({msg:"No user exists"});
        
        //Wrong Credentials
        const passOk  = bcrypt.compareSync(password, userDoc.password);
        if(!passOk) return res.status(400).json({msg:"Wrong credentials"});
        
        //If successfully, return login token
        const loginToken = await jwt.sign({
            email, id:userDoc._id
        }, `${process.env.LOGIN_SECRET}`);
        return res.status(200).cookie('loginToken', loginToken).json({
            id:userDoc._id,
            email
        });

      
    } catch (error) {

        return res.status(400).json({msg:"Error Login",err:error})
        
    }
    
}

module.exports = login;