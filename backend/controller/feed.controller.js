const Feed = require('../models/feed.model');
const feedController = {};
const transporter = require('../config/nodemailer'); 
const fs = require('fs');
const feed = require('../models/feed.model');

async function sendResponseEmail(email, name, message,subject) {
    try {console.log(subject);
        const formattedEmail = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${subject}</title>
            </head>a
            <body>
                <p>Hello ${name},</p>
                <p>Thank you for your feedback:</p>
                <p>${message}</p>
                <p>Best regards,</p>
                <p>The Admin Team</p>
            </body>
            </html>
        `;

        await transporter.sendMail({
            from: 'recrutement@xsustain.io',
            to: email,
            subject: subject,
            html: formattedEmail
        });

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

feedController.sentres = async (req, res, next) => {
    const { email, name, subject, message } = req.body;
    try {
        await sendResponseEmail(email, name, message,subject);
        console.log(subject);
        return res.send({ message: 'Response email sent successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

feedController.register = async (req, res, next) => {
    const { name, email, subject, message } = req.body;
    try {
        console.log(req.body);

        const newFeed = new Feed({ name, email, subject, message });
        const feeed = await newFeed.save();
        const messagen="";
        console.log(subject);

        await sendResponseEmail(email, name, messagen,subject);

        return res.send({ feeed });
    } catch (e) {
        console.log(e);
        next(e);
    }
};



feedController.getAllFeeds = async (req, res, next) => {
    try {
        const feeds = await Feed.find(); // Utiliser Feed.find() pour récupérer tous les feeds
        return res.send({ feeds });
    } catch (e) {
        console.log(e);
        next(e);
    }
};

feedController.deleteFeed = async (req, res, next) => {
    const { feedId } = req.params; // Utiliser feedId au lieu de userId
    try {
        const deletedFeed = await Feed.findByIdAndDelete(feedId); // Utiliser Feed.findByIdAndDelete pour supprimer un feed
        if (!deletedFeed) {
            return res.status(404).send({ message: "Feed not found" });
        }
        return res.send({ message: "Feed deleted successfully" });
    } catch (e) {
        console.log(e);
        next(e);
    }
};
feedController.markAsRead = async (req, res, next) => {
    try {
      const { feedId } = req.params;
  
      const feeds = await feed.findByIdAndUpdate(feedId, { status: 'read' }, { new: true });
      if (!feeds) {
        return res.status(404).json({ feed: 'feeed not found' });
      }
  
      res.json(feeds);
    } catch (error) {
      next(error);
    }
  };

  feedController.markAsUnread = async (req, res, next) => {
    try {
      const { feedId } = req.params;
  
      const feeds = await feed.findByIdAndUpdate(feedId, { status: 'unread' }, { new: true });
      if (!feeds) {
        return res.status(404).json({ feed: 'feeed not found' });
      }
  
      res.json(feeds);
    } catch (error) {
      next(error);
    }
  };



module.exports = feedController;
