const express = require('express');
const router = express.Router();
const playlistController = require('../controller/playlist.controller');
const upload = require('../middleware/multer'); 

// Route pour créer une nouvelle playlist
router.post('/register',playlistController.createPlaylist);
router.get('/getAll',playlistController.getAll);
router.get('/getbyid/:playlistId',playlistController.getbyid);
router.put('/update/:playlistId',playlistController.updatePlaylist);
router.delete('/delete/:playlistId',playlistController.deleteplay);

router.get('/getmusic/:playlistId',playlistController.getmusic);
router.get('/getduration/:playlistId',playlistController.getduration);




module.exports = router;
