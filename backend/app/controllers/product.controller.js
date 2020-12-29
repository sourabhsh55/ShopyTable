const { Products } = require("../models/productModel");

module.exports.allProducts = async(req,res)=>{
    const productData = await Products.find();
    if(!productData){
        res.send("no product found!");
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
        rating:Rating
    } = req.body;

    console.log(req.body);

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
};

module.exports.getProductID = async(req,res)=>{
    const productID = req.params.id;
    console.log(`id : ${productID}`);
    const productFound = await Products.findOne({_id:productID});
    console.log(productFound);
    if(!productFound){
        res.status(400).send(`no product with id: ${productID}`);
        return;
    }
    res.status(201).json({product:productFound});
    return;
};

module.exports.deleteProductID = async(req,res)=>{
    const productID = req.body.productID;
    const productFound = await Products.findOne({_id:productID});
    if(!productFound){
        res.status(400).send(`no product with id: ${productID}`);
        return;
    }
    res.status(200).send("product removed!");
    return;
} 