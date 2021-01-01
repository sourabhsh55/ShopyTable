const mongoose = require("mongoose");
const { Products } = require("./productModel");
// const { Users } = require("./userModel");

const cartSchema = new mongoose.Schema({
    user_email : {
        type:String,
        required:true
    },
    items : [{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Products',
            required:true  
    }],
    Qty : [{
        type:Number,
        required:true
    }]
});

const Carts = mongoose.model('Carts',cartSchema);

exports.Carts = Carts;