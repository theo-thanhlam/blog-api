const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true, 
        min:4,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    password:{
        type:String,
        required: true
    }


})

const UserModel  = mongoose.model("User", UserSchema);
module.exports = UserModel;
