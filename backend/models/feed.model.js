const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    subject:String,
    message:String,
    status: { type: String, enum: ['read', 'unread'], default: 'unread' },
    evaluation: { type: Number, min: 1, max: 5, default: null },
  
},{timestamps:true});


const feed = new mongoose.model("Feed",userSchema);


module.exports = feed;
