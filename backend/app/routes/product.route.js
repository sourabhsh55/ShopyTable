const express = require("express");
const productRouter = express.Router();
const controller = require("../controllers/product.controller");
const { isAuth, isAdmin } = require("../middlewares/auth.verify");
const {
    verifyProductIDField,
    verifyAddProductField
} = require("../middlewares/productField.verify");

// All Products
productRouter.get("/allProducts",controller.allProducts);

// Add Product
productRouter.post("/addProduct",verifyAddProductField,isAuth,controller.addProduct);

// Product : ID
productRouter.get("/:id",verifyProductIDField,controller.getProductID);

// Delete Product : ID
productRouter.delete("/:id",verifyProductIDField,isAuth,isAdmin,controller.deleteProductID);


// Export module
module.exports = productRouter;