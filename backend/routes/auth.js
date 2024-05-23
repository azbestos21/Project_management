const express = require("express");
const authController = require("../controllers/auth");
const mid = require("../middleware/auth");
const router = express.Router();
router.post('/register', authController.mentorregister);
router.post('/login', authController.mentorlogin);
router.post('/studentregister', authController.studentregister);
router.post('/adminregister', authController.adminregister);
router.post('/adminlogin', authController.adminlogin);
router.post('/studentlogin', authController.studentlogin);
router.post('/assignmentor', authController.assignmentor);//pending
router.get('/viewgroups', mid.mentorauthenticationMiddleware,authController.grouplist);
router.get('/viewprojects', mid.mentorauthenticationMiddleware,authController.projectlist);
router.get('/studentproject', mid.authenticationMiddleware,authController.studentproject);
router.post('/studentupload',mid.authenticationMiddleware,authController.uploadphase)
router.get('/studentteam',mid.authenticationMiddleware,authController.studentteam)
router.get('/studentmentor',mid.authenticationMiddleware,authController.studentmentor);
router.post('/teamregister',mid.authenticationMiddleware,authController.teamregister);
router.get('/mentormentor',mid.mentorauthenticationMiddleware,authController.mentormentor)
router.get('/mentorlist',authController.mentorlist);
router.get('/adminprojectlist',authController.adminprojectlist);//pending
router.get('/adminmentorlist',authController.adminmentorlist);//pending
router.post('/acceptproject',authController.acceptProject);
router.post('/searchdomain',authController.searchdomain);//pending
router.post('/rejectproject',authController.rejectProject);
//router.get('/checkmentor',mid.authenticationMiddleware,authController.checkmentor)//pending
module.exports = router;
