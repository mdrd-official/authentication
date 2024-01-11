const express = require('express');
const router = express.Router();
const userController = require('../controllers/User');
const { authenticateUser } = require('../middlewares/auth');


router.post('/register', userController.registerUser);
router.post('/login', authenticateUser, userController.loginUser);


module.exports = router;

