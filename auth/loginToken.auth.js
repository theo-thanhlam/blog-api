require('dotenv').config();
const jwt = require('jsonwebtoken');

function loginTokenAuth(req,res){
    const {loginToken} = req.cookies;
    jwt.verify(loginToken, process.env.LOGIN_SECRET, {}, (err,info) =>{
        if(err) throw err;
        res.json(info);
    });


}

module.exports = loginTokenAuth;