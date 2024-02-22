const express = require("express");
const authController = require("../controllers/auth");
const mid = require("../middleware/auth");
const router = express.Router();
<<<<<<< HEAD
router.post("/register", authController.mentorregister);
router.post("/login", authController.mentorlogin);
router.post("/studentregister", authController.studentregister);
router.post("/studentlogin", authController.studentlogin);
router.post(
  "/projectregister",
  mid.authenticationMiddleware,
  authController.projectregister
); //FRONTEND PENDING
router.get(
  "/viewgroups",
  mid.mentorauthenticationMiddleware,
  authController.grouplist
);
router.get(
  "/viewprojects",
  mid.mentorauthenticationMiddleware,
  authController.projectlist
);
router.get(
  "/studentproject",
  mid.authenticationMiddleware,
  authController.studentproject
);
router.post(
  "/studentupload",
  mid.authenticationMiddleware,
  authController.uploadphase
); //FRONTEND PENDING
router.get(
  "/studentteam",
  mid.authenticationMiddleware,
  authController.studentteam
); //FRONTEND PENDING
router.post("/acceptproject", authController.acceptProject);
router.post("/rejectproject", authController.rejectProject);
=======
router.post('/register', authController.mentorregister);
router.post('/login', authController.mentorlogin);
router.post('/studentregister', authController.studentregister);
router.post('/studentlogin', authController.studentlogin);
router.post('/projectregister', mid.authenticationMiddleware,authController.projectregister);
router.get('/viewgroups', mid.mentorauthenticationMiddleware,authController.grouplist);
router.get('/viewprojects', mid.mentorauthenticationMiddleware,authController.projectlist);
router.get('/studentproject', mid.authenticationMiddleware,authController.studentproject);
router.post('/studentupload',mid.authenticationMiddleware,authController.uploadphase)
router.get('/studentteam',mid.authenticationMiddleware,authController.studentteam)
router.get('/studentmentor',mid.authenticationMiddleware,authController.studentmentor);
router.post('/acceptproject',authController.acceptProject);
router.post('/rejectproject',authController.rejectProject);
>>>>>>> 63a8affd497b05308cf77d6bd7864b89b2d7d58f
module.exports = router;
