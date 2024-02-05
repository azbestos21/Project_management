const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

// Register route
router.post('/register', authController.adminregister);

// Login route
router.post('/login', authController.adminlogin);

router.post('/studentregister', authController.studentregister);
router.post('/studentlogin', authController.studentlogin);
/// In your server-side code, modify the route to handle both regular and AJAX requests
router.get('/viewstudents', authController.studentlist);
router.get('/viewgroups', authController.grouplist);
router.get('/viewprojects', authController.projectlist);
router.get('/search', authController.studentlist);
module.exports = router;
