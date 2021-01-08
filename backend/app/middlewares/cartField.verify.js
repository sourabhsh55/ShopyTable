

const { types } = require("joi");
const Joi = require("joi");

module.exports.verifyAllProductField = (req,res,next)=>{

    const schema = Joi.object({
        email:Joi.string().required(),
    });

    const result = schema.validate(req.body);
    if(result.error){
        res.json({error:result.error.details[0].message});
        return;
    }
    next();
}


module.exports.verifyAddProductField = (req,res,next)=>{
    console.log("--recieved : ",req.body);
    const schema = Joi.object({
        email:Joi.string().required(),
        productID:Joi.string().required(),
        Qty:Joi.number().required()
    });

    const result = schema.validate(req.body);
    console.log("result: ",result);
    if(result.error){
        console.log("yes~err");
        res.json({error:result.error.details[0].message});
        return;
    }
    next();
};

module.exports.verifyDeleteProductField = (req,res,next)=>{
    console.log("--recieved : ",req.body);
    const schema = Joi.object({
        email:Joi.string().required(),
        productID:Joi.string().required(),
    });

    const result = schema.validate(req.body);
    console.log("result: ",result);
    if(result.error){
        console.log("yes~err");
        res.json({error:result.error.details[0].message});
        return;
    }
    next();
}