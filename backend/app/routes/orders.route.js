const express = require("express");
const orderRouter = express.Router();
const controller = require("../controllers/order.controller");
const { isAuth } = require("../middlewares/auth.verify");
const { verifyAddOrder } = require("../middlewares/orderField.verify");

// allOrders
orderRouter.post("/allOrders",isAuth,controller.allOrders);

// placeOrder
orderRouter.post("/placeOrder",verifyAddOrder,isAuth,controller.placeOrder);

// updateOrder
orderRouter.post("/updateOrder",isAuth,controller.updateOrder);

// Export Module
module.exports = orderRouter;