const express = require('express');
const router = express.Router();

router.get('/secret', (req, res) => {
  res.render('index');  
});

router.get('/register', (req, res) => {
  res.render('register');  
});

router.get('/login', (req, res) => {
  res.render('login');  
});
router.get('/', (req, res) => {
    res.render('studenthome');  
  });
  
  router.get('/studentregister', (req, res) => {
    res.render('student_register');  
  });
  
  router.get('/studentlogin', (req, res) => {
    res.render('student_login');  
  });
module.exports = router;
