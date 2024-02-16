const express = require('express');
const router = express.Router();

const { extractUserDataFromToken } = require('../middleware/jwt');

const userController = require('../controller/user.controller');
const upload = require('../middleware/multer'); 


router.post('/register',upload.single('image'), userController.register);

router.get('/getall', userController.getAllUsers);
router.get('/getbyid/:userId', userController.getUserById);
router.put('/update/:userId', upload.single('image'),userController.updateUser);
router.delete('/delete/:userId', userController.deleteUser);

router.get('/login', userController.login);

router.get('/profile', extractUserDataFromToken,userController.profile);




module.exports = router ;