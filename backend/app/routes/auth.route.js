const express = require("express");
const authRoute = express.Router();
const controller = require("../controllers/auth.controller.js");
const { isAdmin, isAuth } = require("../middlewares/auth.verify.js");
const {
    verifyRegister_LoginField,
    verifynewAccessTokenField,
    verifyLogoutField
} = require("../middlewares/authField.verify");

// REGISTER
authRoute.post("/register",verifyRegister_LoginField,controller.register);

// LOGIN
authRoute.post("/login",verifyRegister_LoginField,controller.login);

// NewAccessToken
authRoute.post("/newAccessToken",verifynewAccessTokenField,controller.newAccessToken);

// Logout
authRoute.delete("/logout",verifyLogoutField,controller.logout);

// IsAdmin
authRoute.post('/isAdmin',isAuth,isAdmin,controller.isAdmin);

//Export module
module.exports = authRoute;