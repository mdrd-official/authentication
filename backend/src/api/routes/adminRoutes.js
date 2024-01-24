const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
router.use(express.urlencoded({ extended: false }));

router.post('/login', adminController.adminLoginPost);
router.get('/users', adminController.getAllUsers);
router.post('/addUser', adminController.addUser);
router.get('/user/:id', adminController.getUser);
router.post('/edit-user', adminController.editUser);
router.delete('/delete-user/:id', adminController.deleteUser);

module.exports = router;
