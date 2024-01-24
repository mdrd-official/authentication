const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken  = require('../middlewares/jwt');
const upload = require('../middlewares/multer');  

router.use(express.urlencoded({ extended: false }));


router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/profileImage', verifyToken, upload.single("image"), userController.updateUserProfileImage);
router.get('/profile', verifyToken, userController.getUserProfile);
router.get('/logout', userController.logoutUser);
router.post('/profile', verifyToken, userController.updateUserProfile);


module.exports = router;

    