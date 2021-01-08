const express = require("express");
const cartRouter = express.Router();
const controller = require("../controllers/cart.controller");
const {isAuth, isAdmin} = require("../middlewares/auth.verify");
const{
    verifyAllProductField,
    verifyAddProductField,
    verifyDeleteProductField
} = require("../middlewares/cartField.verify");

// allProducts
cartRouter.post("/allProducts",verifyAllProductField,isAuth,controller.allProducts);
// cartRouter.get("/allProducts",controller.allProducts);

// addProduct
cartRouter.post("/addProduct",verifyAddProductField,isAuth,controller.addProduct);
// cartRouter.post("/addProduct",controller.addProduct);

// DeleteProduct
cartRouter.delete("/deleteProduct",verifyDeleteProductField,isAuth,controller.deleteProduct);

// Export Module
module.exports = cartRouter;