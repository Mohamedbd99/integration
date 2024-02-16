const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    imagePath:String,
},
{timestamps:true});


const User = new mongoose.model("user",userSchema);


module.exports = User;
