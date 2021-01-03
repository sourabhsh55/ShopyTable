const Joi = require("joi")

module.exports.verifyAddOrder = (req,res,next)=>{
    const schema = Joi.object({
        email:Joi.string().required(),
        address:Joi.string().required(),
        pincode:Joi.number().required(),
        totalCost:Joi.number().required(),
        isDelievered:Joi.boolean(),
        // Qty:Joi.array().required(),
        // items_id:Joi.array().required()
        Qty:Joi.array().items(Joi.number()),
        items_id:Joi.array().items(Joi.string())
    });

    const result = schema.validate(req.body);
    if(result.error){
        res.json({message:result.error.details[0].message});
        return;
    }
    next();
}