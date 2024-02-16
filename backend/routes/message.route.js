const express = require('express');
const router = express.Router();
const messageController = require('../controller/message.controller');

router.post('/register/:senderId', messageController.createMessage);
router.get('/GetOwn/:recieverId', messageController.getMessagebyIdUser);
router.delete('/delete/:recieverId/:msgId', messageController.deleteMessage);
router.put('/markAsRead/:messageId', messageController.markAsRead);
router.put('/markAsUnread/:messageId', messageController.markAsUnread);
router.put('/reply/:messageId', messageController.replyToMessage);
router.put('/addNotes/:messageId', messageController.addNotesToMessage);


module.exports = router;
