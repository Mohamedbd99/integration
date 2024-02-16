const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subject: String,
    imagePath: String ,
    date:String,
    price:String,
    location:String,
    title:String

}, { timestamps: true });


const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
