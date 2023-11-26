const User = require("../models/User.models");
const connectDb = require("../utils/database.utils");
const bcrypt = require('bcryptjs')

const SALT = bcrypt.genSaltSync(10);


async function register(req, res) {
    try {
        await connectDb();
        const {name,email, password} = req.body;
        let userExist = await User.findOne({email});
        if(userExist !== null) return res.status(400).json({msg:"Existed"});

        await User.create(
        {   
            name,
            email, 
            password:bcrypt.hashSync(password, SALT)
        });

        return res.status(200).json({msg:"Create Successfully"})
    } catch (error) {
        return res.status(400).json(error);
    }
    
}

module.exports = register;