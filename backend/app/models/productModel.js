const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    category:{type:String,required:true},
    brand:{type:String},
    price:{type:Number,required:true},
    countInStock:{type:Number,required:true},
    rating:{type:Number,required:true},
});

const Products = mongoose.model('Products',productSchema);

exports.Products = Products;