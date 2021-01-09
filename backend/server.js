const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoute = require("./app/routes/product.route");
const ordersRoute = require("./app/routes/orders.route");
const cartsRoute = require("./app/routes/carts.route");
const authRoute = require("./app/routes/auth.route");

require('dotenv').config();

app.use(express.json());
app.use(cors());        
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req,res,next){
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
})

app.use("/products",productRoute);
app.use("/orders",ordersRoute);
app.use("/carts",cartsRoute);
app.use("/auth",authRoute);


//----------------------------------------------------------------------------
mongoose.connect(`${process.env.MONGODB}/ShopyTable`,{ useNewUrlParser: true,useUnifiedTopology: true })
 .then(()=>console.log('connected to mongodb'))
 .catch((err)=>console.error('could not connect, ERROR:',err));

//----------------------------------------------------------------------------
app.get("/",(req,res)=>{
    res.send("hello world!");
});

//----------------------------------------------------------------------------
const PORT = process.env.PORT || 5000;

app.listen(5000,(e)=>{
    if(e){
        console.log("server starting error : ",e);
    }
    else{
        console.log("server is running!");
    }
})
