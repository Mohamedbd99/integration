const express = require('express');
const router = express.Router();
const feedController = require('../controller/feed.controller');

router.post('/registerfeed', feedController.register);
router.post('/sentres', feedController.sentres);
router.get('/getAllFeeds', feedController.getAllFeeds);
router.delete('/deleteFeed/:feedId', feedController.deleteFeed); 
router.put('/read/:feedId', feedController.markAsRead); 
router.put('/unread/:feedId', feedController.markAsUnread); 

module.exports = router;