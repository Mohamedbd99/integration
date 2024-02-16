const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    imagePath: String ,
    title:String,
    description:String

}, { timestamps: true });


const News = mongoose.model("News", eventSchema);

module.exports = News;
