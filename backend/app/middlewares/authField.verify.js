
const Joi = require("joi");

module.exports.verifyRegister_LoginField = (req,res,next)=>{
    const schema = Joi.object({
        username:Joi.string().min(4).required(),
        email:Joi.string().required(),
        password:Joi.string().min(4).required()
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.json({error:result.error.details[0].message});
        return;
    }
    next();
}

module.exports.verifynewAccessTokenField = (req,res,next)=>{
    const schema = Joi.object({
        refreshToken:Joi.string().min(3).max(200).required(),
        email:Joi.string().required(),
        username:Joi.string().required()
        // password:Joi.string().min(4).required()
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.json({error:result.error.details[0].message});
        return;
    }
    next();
}

module.exports.verifyLogoutField = (req,res,next)=>{
    const schema = Joi.object({
        email:Joi.string().required()
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.json({error:result.error.details[0].message});
        return;
    }
    next();
}