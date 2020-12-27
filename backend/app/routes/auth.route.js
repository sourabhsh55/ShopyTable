const express = require("express");
const authRoute = express.Router();
const {Users} = require("../models/userModel");
const {generateToken} = require("../utils");
const bcrypt = require("bcrypt");

authRoute.use(express.json());

// REGISTER
authRoute.post("/register",async (req,res)=>{

    const Username = req.body.username;
    const Password = req.body.password;
    const Email = req.body.email;


    const isRegistered = await Users.findOne({email:Email});
    if(isRegistered){
        res.status(422).send("User already exists!");
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
        res.status(201).json({"registered user":reg_user});
        return;
    }
    catch{
        res.status(500).send("~ERROR : 00AUTH/register");
        return;
    }
});

// LOGIN
authRoute.post("/login",async (req,res)=>{
    const Username = req.body.username;
    const Password = req.body.password;
    const Email = req.body.email;


    const isRegistered = await Users.findOne({email:Email});

    if(!isRegistered){
        res.status(401).send("User doesn't exists!");
        return;
    }

    try{
        const correctPassword = isRegistered.password;
        const isPasswordCorrect = await bcrypt.compare(Password,correctPassword);

        if(!isPasswordCorrect){
            res.status(401).send("you have entered a wrong password!");
            return;
        }

        const user_payLoad = {
            email:Email,
            username:Username
        };

        const token = generateToken(user_payLoad);
        res.status(201).json({token:token});
        return;
    }
    catch{
        res.send("~ERROR : 00AUTH/login");
        return;
    }
})


module.exports = authRoute;