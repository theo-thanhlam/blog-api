const User = require("../models/User.models");
const connectDb = require("../utils/database.utils");

async function register(req, res) {
    try {
        await connectDb();
        const {email, password} = req.body;
        const userDoc = await User.create({email, password});

        return res.status(200).json(userDoc)
    } catch (error) {
        return res.status(400).json({msg:"Email is registered"})
    }
    
}

module.exports = register;