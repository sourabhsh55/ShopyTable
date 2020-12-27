
// api/products/
// api/product/:ID(get)
// api/product/:ID(delete)
// api/product/:ID(put)

const express = require("express");
// const Joi = require("joi");
const productRouter = express.Router();
const {Products} = require("../models/productModel");

productRouter.get("/",async(req,res)=>{
    const productData = await Products.find();
    if(!productData){
        res.send("no product found!");
        return;
    }
    res.json({products:productData});
    return;
});

productRouter.post("/addProduct",async(req,res)=>{
    const {
        name:Name,
        category:Category,
        brand:Brand,
        price:Price,
        countInStock:CountInStock,
        rating:Rating
    } = req.body;

    console.log(req.body);

    // const isProductOK = checkProduct();
    // if(!isProductOK){
    //     res.send("something is missing");
    // };

    const new_Product = new Products({
        name:Name,
        category:Category,
        brand:Brand,
        price:Price,
        countInStock:CountInStock,
        rating:Rating
    });

    const reg_product = await new_Product.save();
    res.status(201).send("new product added!");
    return;
});

productRouter.get("/:id",async(req,res)=>{
    const productID = req.params.id;
    const productFound = await Products.findOne({_id:productID});
    if(!productID){
        res.status(400).send(`no product with id: ${productID}`);
        return;
    }
    res.status(201).json({product:productFound});
    return;
})

module.exports = productRouter;