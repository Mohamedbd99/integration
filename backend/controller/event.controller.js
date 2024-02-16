//event.controller.js

const Event = require('../models/event.model');

const eventController = {};

eventController.register = async (req, res, next) => {
    try {
        const { date,subject ,location,title,price} = req.body;
        const imagePath ="http://localhost:5000/images/"+ req.file.filename; 
        const { userId } = req.params;

        const newEvent = new Event({  subject,user:userId, imagePath,date,location,title,price });

        const event = await newEvent.save();

        return res.status(201).send({ event });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};

eventController.updateEvent = async (req, res, next) => {
    const { eventId } = req.params;
    const { date,subject ,location,title,price} = req.body;
    const imagePath = req.file.filename; 
    const { userId } = req.params;  try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId,{  subject,user:userId, imagePath,date,location,title,price }, { new: true });
        if (!updatedEvent) {
            return res.status(404).send({ message: "Event not found" });
        }
        return res.send({ event: updatedEvent });
    } catch (e) {
        console.log(e);
        next(e);
    }
};
eventController.getAllEvents = async (req, res, next) => {
    try {
        const events = await Event.find();
        return res.send({ events });
    } catch (e) {
        console.log(e);
        next(e);
    }
};

eventController.getEventById = async (req, res, next) => {
    const { eventId } = req.params;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).send({ message: "Event not found" });
        }
        return res.send({ event });
    } catch (e) {
        console.log(e);
        next(e);
    }
};



eventController.deleteEvent = async (req, res, next) => {
    const { eventId } = req.params;
    try {
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if (!deletedEvent) {
            return res.status(404).send({ message: "Event not found" });
        }
        return res.send({ message: "Event deleted successfully" });
    } catch (e) {
        console.log(e);
        next(e);
    }
};

module.exports = eventController;
