

const Joi = require("joi");

module.exports.verifyProductIDField = (req,res,next)=>{

    const schema = Joi.object({
        id:Joi.string().min(24).required()
    });

    const result = schema.validate(req.params);
    if(result.error){
        res.json({error:result.error.details[0].message});
        return;
    }
    console.log("id is correct");
    next();
};

module.exports.verifyAddProductField = (req,res,next)=>{

    const schema = Joi.object({
        name:Joi.string().required(),
        category:Joi.string().required(),
        brand:Joi.string().required(),
        price:Joi.number().required(),
        countInStock:Joi.number().required(),
        rating:Joi.number().required(),
        image:Joi.string().required()
    });

    const result = schema.validate(req.body);
    if(result.error){
        res.json({error:result.error.details[0].message});
        return;
    }
    next();
};