const { Products } = require("../models/productModel");

module.exports.allProducts = async(req,res)=>{
    console.log("call is made on /allProducts");
    const productData = await Products.find();
    if(!productData){
        res.status(404).json({error:"no product found!"});
        return;
    }
    res.json({products:productData});
    return;
};

module.exports.addProduct = async(req,res)=>{
    const {
        name:Name,
        category:Category,
        brand:Brand,
        price:Price,
        countInStock:CountInStock,
        rating:Rating,
        image:Image
    } = req.body;

    console.log(req.body);

    const new_Product = new Products({
        name:Name,
        category:Category,
        brand:Brand,
        price:Price,
        countInStock:CountInStock,
        rating:Rating,
        image:Image
    });

    const reg_product = await new_Product.save();
    if(!reg_product){
        return res.json({message:"product not added!"});
    }
    res.json({reg_product:reg_product});
    return;
};

module.exports.getProductID = async(req,res)=>{
    const productID = req.params.id;
    console.log(`ID : ${productID}`);
    const productFound = await Products.findOne({_id:productID});
    console.log(productFound);
    if(!productFound){
        res.status(404).json({error:`No product found with id: ${productID}`});
        return;
    }
    res.status(201).json({product:productFound});
    return;
};

module.exports.deleteProductID = async(req,res)=>{
    const productID = req.body.productID;
    const productFound = await Products.findOne({_id:productID});
    if(!productFound){
        res.status(404).json({error:`no product found with id: ${productID}`});
        return;
    }
    res.status(200).send("product removed!");
    return;
} 