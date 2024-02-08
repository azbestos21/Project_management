const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

router.post('/register', authController.adminregister);
router.post('/login', authController.adminlogin);
router.post('/studentregister', authController.studentregister);
router.post('/studentlogin', authController.studentlogin);
router.get('/viewstudents', authController.studentlist);
router.get('/viewgroups', authController.grouplist);
router.get('/viewprojects', authController.projectlist);
router.get('/search', authController.studentlist);
module.exports = router;
