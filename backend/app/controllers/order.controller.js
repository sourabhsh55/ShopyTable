const { Orders } = require("../models/orderModel");

module.exports.allOrders = async(req,res)=>{
    const user_email = req.query.email;
    const userExists = await Orders.findOne({user_email:user_email});
    if(!userExists){
        res.status(400).send("empty!");
        return;
    }

    const items = userExists.orders;
    res.status(201).json({ORDERS:items});
    return;
};

module.exports.placeOrder = async(req,res)=>{
    const{
        email:user_email,
        address,
        pincode,
        items_id,
        Qty,
        totalCost
    } = req.body;


    var newOrder = {
        address:address,
        pincode:pincode,
        isDelivered:false,
        totalCost:totalCost,
        items_id : items_id,
        Qty:Qty,
    } 
    
    console.log("user_email : ",user_email);
    //check if user had ordered anything before.
    const user_Exists = await Orders.findOne({email:user_email});
    if(!user_Exists){
        const new_order = new Orders({
            email:user_email,
            orders:newOrder
        });

        const reg_item = await new_order.save();
        res.status(200).json({reg_item:reg_item});
    }
    else{
        user_Exists.orders.push(newOrder);
        const reg_item = await user_Exists.save();
        res.status(200).json({reg_item:reg_item});
    }
    return;
};

module.exports.updateOrder = async(req,res)=>{
    const {email:user_email,productID} = req.body;

    const user_Exists = await Orders.findOne({email:user_email});
    if(!user_Exists){
        return res.json({message:"user not found"});
    }

    const len = user_Exists.orders.length;
    for(let i=0;i<len;i++){
        if(user_Exists.orders[i]._id==productID){
            user_Exists.orders[i].isDelivered = true;
            await user_Exists.save();
            res.json({message:"changes done!"});
            return;
        }
    }
    res.json({message:"no changes made"});
    return;
}