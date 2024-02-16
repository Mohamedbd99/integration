// Dans event.route.js

const express = require('express');
const router = express.Router();
const eventController = require('../controller/event.controller');
const upload = require('../middleware/multer'); 
router.post('/register/:userId', upload.single('image'), eventController.register);

router.get('/getall', eventController.getAllEvents);
router.get('/getbyid/:eventId', eventController.getEventById);
router.put('/update/:eventId', upload.single('image'),eventController.updateEvent);
router.delete('/delete/:eventId', eventController.deleteEvent);

module.exports = router;
