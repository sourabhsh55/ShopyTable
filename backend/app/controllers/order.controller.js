const { Orders } = require("../models/orderModel");

module.exports.allOrders = async(req,res)=>{
    const user_email = req.query.email;
    const userExists = await Orders.findOne({user_email:user_email});
    if(!userExists){
        res.status(400).send("empty!");
        return;
    }

    const items = userExists.items;
    res.status(201).json({items:items});
    return;
};

module.exports.placeOrder = async(req,res)=>{
    const user_email = req.body.email;
    const items = req.body.items;

    const new_item = new Orders({
        user_email:user_email,
        items:items
    });

    const reg_item = await new_item.save();
    res.status(200).json({reg_item:reg_item});
    return;
} 