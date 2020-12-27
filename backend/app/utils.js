const jwt = require("jsonwebtoken");

module.exports.generateToken = function(payLoad){
    const token = jwt.sign(payLoad,"secretAccessTokenKey@123");
    return token; 
}
