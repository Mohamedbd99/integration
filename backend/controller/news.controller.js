//News.controller.js

const News = require('../models/news.model');

const NewsController = {};

NewsController.register = async (req, res, next) => {
    try {
        const { description,title} = req.body;
        const imagePath ="http://localhost:5000/images/"+ req.file.filename; 
        const { userId } = req.params;

        const newNews = new News({ description, user: userId, imagePath, title });

        const savedNews = await newNews.save();
        
        return res.status(201).send({ News: savedNews });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};

NewsController.updateNews = async (req, res, next) => {
    const { NewsId } = req.params;
    const { description, title } = req.body;
    const imagePath = req.file.filename; 
    const { userId } = req.params;
    try {
        const updatedNews = await News.findByIdAndUpdate(NewsId, { description, user: userId, imagePath, title }, { new: true });
        if (!updatedNews) {
            return res.status(404).send({ message: "News not found" });
        }
        return res.send({ News: updatedNews });
    } catch (e) {
        console.log(e);
        next(e);
    }
};

NewsController.getAllNews = async (req, res, next) => {
    try {
        const Newss = await News.find();
        return res.send({ Newss });
    } catch (e) {
        console.log(e);
        next(e);
    }
};

NewsController.getNewsById = async (req, res, next) => {
    const { NewsId } = req.params;
    try {
        const o = await News.findById(NewsId); 
        if (!o) {
            return res.status(404).send({ message: "News not found" });
        }
        return res.send({ o });
    } catch (e) {
        console.log(e);
        next(e);
    }
};




NewsController.deleteNews = async (req, res, next) => {
    const { NewsId } = req.params;
    try {
        const deletedNews = await News.findByIdAndDelete(NewsId);
        if (!deletedNews) {
            return res.status(404).send({ message: "News not found" });
        }
        return res.send({ message: "News deleted successfully" });
    } catch (e) {
        console.log(e);
        next(e);
    }
};

module.exports = NewsController;
