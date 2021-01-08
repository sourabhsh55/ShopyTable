require('dotenv').config();
const jwt = require("jsonwebtoken");
const { Users } = require('../models/userModel');

module.exports.isAuth = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401).json({error:"invalid token"});

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err){
            res.json({error : err.message});
            return;
        }
        next();
    });
};

module.exports.isAdmin = async(req,res,next)=>{
    const user_email = req.body.email;
    const user_name = req.body.name;

    console.log(user_email);
    console.log(user_name);

    const result = await Users.findOne({email:user_email,username:user_name});
    if(!result){
        return res.json({error:"not a user"});
    }
    if(result.role!=="admin"){
        return res.json({error:"not an admin"});
    }
    next();
}