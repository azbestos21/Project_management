const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

// Register route
router.post('/register', authController.adminregister);

// Login route
router.post('/login', authController.adminlogin);

router.post('/studentregister', authController.studentregister);
router.post('/studentlogin', authController.studentlogin);

module.exports = router;
