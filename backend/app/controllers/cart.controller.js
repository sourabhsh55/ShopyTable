const { Carts } = require("../models/cartModel");
const { Products } = require("../models/productModel");

// its a comment

module.exports.allProducts = async(req,res)=>{
    const user_email = req.query.email;
    const userExists = await Carts.findOne({user_email:user_email}).populate('items');

    if(!userExists){
        res.status(400).send("empty!");
        return;
    }

    const items = userExists.items;
    res.status(201).json({items:items});
    return;
};

module.exports.addProduct = async(req,res)=>{
    const user_email = req.body.email;
    const productID = req.body.productID;

    const user_Exists = await Carts.findOne({user_email:user_email});
    if(!user_Exists){
        const new_item = new Carts({
            user_email:user_email,
            items:[productID]
        });

        const reg_item = await new_item.save();
        res.status(200).json({reg_item:reg_item});
        return;
    }

    user_Exists.items.push(productID);
    const reg_item = await user_Exists.save();
    res.status(200).json({reg_item:reg_item});
    return;
};

module.exports.deleteProduct = async(req,res)=>{
    const productID = req.body.productID;
    const email = req.body.email;

    const user_Exists = await Carts.findOne({user_email:user_email});
    if(!user_Exists){
        return res.sendStatus(404);
    }

    user_Exists.items = user_Exists.items.filter(item=> item!=productID);
    const cart_changed = await user_Exists.save();
    res.status(200).json({cart:cart_changed});
    return;
} 