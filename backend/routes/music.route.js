// routes/music.route.js

const express = require('express');
const router = express.Router();
const musicController = require('../controller/music.controller');
const upload = require('../middleware/multer.music');

router.post('/register', upload.single('audioFile'), musicController.register);

router.get('/getbyid/:id', musicController.getMusicByIdd);

router.get('/getall', musicController.getAllMusic);

router.put('/update/:id', upload.single('audioFile'), musicController.updateMusic);

router.delete('/delete/:id', musicController.deleteMusic);

module.exports = router;
