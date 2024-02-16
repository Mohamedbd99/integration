const User = require('../models/user.model');
const Message = require('../models/message.model');

const messageController = {};

messageController.createMessage = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const senderId = req.params.senderId;
    const receiverId = req.body.receiver;

    const senderExists = await User.exists({ _id: senderId });
    if (!senderExists) {
      return res.status(404).json({ message: 'Sender not found' });
    }

     const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

     const message = await Message.create({ title, content, sender: senderId, receiver: receiverId });

     res.status(201).json(message);
  } catch (error) {
     next(error);
  }
};

messageController.getMessagebyIdUser = async (req, res, next) => {
    try {
      const { recieverId } = req.params;
      const messages = await Message.find({ receiver: recieverId });  
      if (!messages || messages.length === 0) {
        return res.status(404).json({ message: 'No messages found for this user' });
      }
      res.json(messages);
    } catch (error) {
      next(error);
    }
  };
    
  
  messageController.deleteMessage = async (req, res, next) => {
    try {
      const { recieverId, msgId } = req.params;
  
      const message = await Message.findByIdAndDelete({ receiver: recieverId, _id: msgId }); 
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
      res.json({ message: 'Message deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
  messageController.markAsRead = async (req, res, next) => {
    try {
      const { messageId } = req.params;
  
      const message = await Message.findByIdAndUpdate(messageId, { status: 'read' }, { new: true });
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
  
      res.json(message);
    } catch (error) {
      next(error);
    }
  };
  
  messageController.markAsUnread = async (req, res, next) => {
    try {
      const { messageId } = req.params;
  
      const message = await Message.findByIdAndUpdate(messageId, { status: 'unread' }, { new: true });
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
  
      res.json(message);
    } catch (error) {
      next(error);
    }
  };
  
  messageController.replyToMessage = async (req, res, next) => {
    try {
      const { messageId } = req.params;
      const { response } = req.body;
  
      const message = await Message.findByIdAndUpdate(messageId, { response }, { new: true });
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
  
      res.json(message);
    } catch (error) {
      next(error);
    }
  };
  
  messageController.addNotesToMessage = async (req, res, next) => {
    try {
      const { messageId } = req.params;
      const { notes } = req.body;
  
      const message = await Message.findByIdAndUpdate(messageId, { notes }, { new: true });
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
  
      res.json(message);
    } catch (error) {
      next(error);
    }
  };
  

module.exports = messageController;
