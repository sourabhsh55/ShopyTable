const { Carts } = require("../models/cartModel");
const { Products } = require("../models/productModel");

// its a comment------

module.exports.allProducts = async(req,res)=>{
    const user_email = req.query.email;
    console.log("user_email : ",user_email);
    const userExists = await Carts.findOne({user_email:user_email}).populate('items').select('Qty items -_id');
    // const userExists = await Carts.find({});.select('Qty items')

    if(!userExists){
        res.status(400).send("empty!");
        return;
    }
    res.status(201).json({items:userExists});
    return;
};

module.exports.addProduct = async(req,res)=>{
    const {
        email:user_email,
        productID,
        Qty
    } = req.body;

    const user_Exists = await Carts.findOne({user_email:user_email});

    // IF it is a new user's cart.
    if(!user_Exists){
        const new_item = new Carts({
            user_email:user_email,
            items:[productID],
            Qty:[Qty]
        });

        const reg_item = await new_item.save();
        res.status(200).json({reg_item:reg_item});
        return;
    }

    // user already exist.
    // if given product already exist inside the cart.
    let index = -1;
    const len = user_Exists.items.length;
    for(let i=0;i<len;i++){
        if(user_Exists.items[i]==productID){
            index = i;
            break;
        }
    }
    // console.log("index : ",index);
    if(index!=-1){
        const val_to_be_added = Number(Qty) + Number(user_Exists.Qty[index]);
        user_Exists.Qty[index] = Number(val_to_be_added);
        user_Exists.markModified("Qty");
    }
    else{
        user_Exists.items.push(productID);
        user_Exists.Qty.push(Qty);
    }

    // saving all the changes into the databse.
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