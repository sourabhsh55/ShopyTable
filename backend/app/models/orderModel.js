const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    orders : [
        {
            address:{type:String,required:true},
            pincode:{type:Number,required:true},
            isDelivered:{type:Boolean,default:false},
            totalCost:{type:Number,required:true},
            items_id : {type:Array,required:true},
            Qty:{type:Array,required:true},
            time : { type : Date, default: Date.now() }
        }
    ]
    
})

const Orders = mongoose.model('Orders',orderSchema);

exports.Orders = Orders;