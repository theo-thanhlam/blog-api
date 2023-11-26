async function logout(req,res){
    res.cookie('loginToken', "").json({msg:'ok'});
}

module.exports = logout;