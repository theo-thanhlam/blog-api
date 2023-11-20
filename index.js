const express = require("express");
const app = express();
const cors = require('cors');
const register = require("./controllers/register.controller");

app.use(cors());
app.use(express.json())


app.get("/" , (req,res)=>{
    res.json({msg:"Server opens"});
})

app.post("/register", (req,res) => {
    register(req,res)

})
//mongodb+srv://phatlam:uNe2Wz4VbYkqk9Mv@cluster0.fodzgmy.mongodb.net/?retryWrites=true&w=majority
app.listen(3001)