const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:4,
        maxlength:1024
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:4,
        maxlength:1024
    },
    role:{
        type:String,
        default:"customer"
    }
});

const Users = mongoose.model('Users',userSchema);


exports.Users = Users;