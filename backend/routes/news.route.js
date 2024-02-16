// Dans News.route.js

const express = require('express');
const router = express.Router();
const NewsController = require('../controller/news.controller');
const upload = require('../middleware/multer'); 


router.post('/register/:userId', upload.single('image'), NewsController.register);

router.get('/getall', NewsController.getAllNews);
router.get('/getbyid/:NewsId', NewsController.getNewsById);
router.put('/update/:NewsId', upload.single('image'),NewsController.updateNews);
router.delete('/delete/:NewsId', NewsController.deleteNews);

module.exports = router;
