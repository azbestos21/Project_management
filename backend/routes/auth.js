const express = require('express');
const authController = require('../controllers/auth');
const mid = require('../middleware/auth')
const router = express.Router();
router.post('/register', authController.mentorregister);
router.post('/login', authController.mentorlogin);
router.post('/studentregister', authController.studentregister);
router.post('/studentlogin', authController.studentlogin);
router.post('/projectregister', mid.authenticationMiddleware,authController.projectregister);
router.get('/viewgroups', mid.mentorauthenticationMiddleware,authController.grouplist);
router.get('/viewprojects', mid.mentorauthenticationMiddleware,authController.projectlist);
router.get('/studentproject', mid.authenticationMiddleware,authController.studentproject);
router.post('/studentupload',mid.authenticationMiddleware,authController.uploadphase)
router.post('/acceptproject',authController.acceptProject);
module.exports = router;
