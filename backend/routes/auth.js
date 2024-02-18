const express = require('express');
const authController = require('../controllers/auth');
const mid = require('../middleware/auth')
const router = express.Router();
router.post('/register', authController.mentorregister);
router.post('/login', authController.mentorlogin);
router.post('/studentregister', authController.studentregister);
router.post('/studentlogin', authController.studentlogin);
router.post('/projectregister', mid.authenticationMiddleware,authController.projectregister);
router.get('/viewstudents', authController.studentlist);
router.get('/viewgroups', mid.mentorauthenticationMiddleware,authController.grouplist);
router.get('/viewprojects', mid.mentorauthenticationMiddleware,authController.projectlist);
router.get('/search', authController.studentlist);
module.exports = router;
