require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports.isAuth = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401);

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err){
            // res.send(`~ERROR: ${err}`);
            res.json({message : err});
            return;
        }
        next();
    });
};

