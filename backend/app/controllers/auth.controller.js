require('dotenv').config();
const { Users } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



module.exports.register = async(req,res)=>{
    const Username = req.body.username;
    const Password = req.body.password;
    const Email = req.body.email;


    const isRegistered = await Users.findOne({email:Email});
    if(isRegistered){
        res.status(422).json({error:"User already exists!"});
        return;
    }

    try{
        const salt = await bcrypt.genSalt();
        const hashed_password = await bcrypt.hash(Password,salt);

        const new_user = new Users({
            username:Username,
            email:Email,
            password:hashed_password
        });

        const reg_user = await new_user.save();
        res.status(201).json({message:reg_user});
        return;
    }
    catch{
        res.status(500).json({error:"~ERROR : 00AUTH/register"});
        return;
    }
}

module.exports.login = async(req,res)=>{
    const Username = req.body.username;
    const Password = req.body.password;
    const Email = req.body.email;


    const isRegistered = await Users.findOne({email:Email});

    if(!isRegistered){
        res.status(401).json({error:"User doesn't exists!"});
        return;
    }

    try{
        const correctPassword = isRegistered.password;
        const isPasswordCorrect = await bcrypt.compare(Password,correctPassword);
        console.log(isPasswordCorrect);
        if(!isPasswordCorrect){
            res.status(401).json({error:"you have entered a wrong password!"});
            return;
        }

        const user_payLoad = {
            email:Email,
            username:Username
        };
        const accessToken = generateAccessToken(user_payLoad);
        const refreshToken = jwt.sign(user_payLoad,process.env.REFRESH_TOKEN_SECRET);
        isRegistered.refresh_token = refreshToken;
        await isRegistered.save();
        res.status(201).json({
            accessToken:accessToken,
            refreshToken:refreshToken
        });
        return;
    }
    catch{
        res.json({error:"~ERROR : 00AUTH/login"});
        return;
    }
}

module.exports.newAccessToken = async(req,res)=>{
    const refreshToken = req.body.refreshToken;
    const Username = req.body.username;
    const Email = req.body.email;

    if(!refreshToken){
        res.send("you have not sent any refresh token");
        return;
    }

    const user_payLoad = {
        email:Email,
        username:Username
    };

    const refreshAccessToken = await generateRefreshToken(user_payLoad,refreshToken,Email);
    if(refreshAccessToken.message){
        res.send(refreshAccessToken.message);
        return;
    }
    res.json({token:refreshAccessToken});
    return;
}


module.exports.logout = async(req,res)=>{
    const Email = req.body.email;
    const userFound = await Users.findOne({email:Email});
    userFound.refresh_token="";
    await userFound.save();
    res.json({message:"logged out"});
    return;
}

module.exports.isAdmin = async(req,res)=>{
    res.json({message:"admin"});
    return;
}


// functions-------------------------------------------------------------------------------
function generateAccessToken (payLoad) {
    const token = jwt.sign(payLoad,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'10h'});
    return token;
};

async function generateRefreshToken (payload,refresh_token,user_email) {

    const userFound = await Users.findOne({email:user_email});
    if(!userFound || (userFound && userFound.refresh_token=="")){
        return {message:"sorry but user not found!"};
    }

    let token = "";
    jwt.verify(refresh_token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
        if(err){
            return {message:err};
        }
        token = generateAccessToken(payload);
    });
    return token;
};