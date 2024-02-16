//app.js

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var feedRouter = require('./routes/feed.route'); // Importez votre route feed
const userRouter = require('./routes/user.route');
const eventRouter = require('./routes/event.route');
const newsRouter = require('./routes/news.route');
const musicRouter = require('./routes/music.route');
const playlistRoute = require('./routes/playlist.route');
const messageRoute = require('./routes/message.route');




var app = express(); // Define app here

// Middleware function to log request details
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Call next to proceed to the next middleware/route handler
};

// Include the middleware function before defining routes
app.use(logRequest);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
require('./config/bdd'); // Importez le fichier bdd.js
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Utilisez la route feed
app.use('/apifeed', feedRouter);
app.use('/apiuser',userRouter);
app.use('/apievent',eventRouter);
app.use('/apinews',newsRouter);
app.use('/apimusic',musicRouter);
app.use('/apiplaylist',playlistRoute);
app.use('/apimessage',messageRoute);






// Error handling middleware
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
