const express = require('express');
const router = express.Router();

router.get('/secret', (req, res) => {
  res.json({ message: 'Secret route accessed' });
});

router.get('/register', (req, res) => {
  res.json({ message: 'Register route accessed' });
});

router.get('/login', (req, res) => {
  res.json({ message: 'Login route accessed' });
});

router.get('/', (req, res) => {
  res.json({ message: 'Student home route accessed' });
});

router.get('/auth/login', (req, res) => {
  res.json({ message: 'Admin dashboard route accessed' });
});

router.get('/studentregister', (req, res) => {
  res.json({ message: 'Student registration route accessed' });
});

router.get('/studentlogin', (req, res) => {
  res.json({ message: 'Student login route accessed' });
});

router.get('/admindashboard', (req, res) => {
  res.json({ message: 'Admin dashboard route accessed' });
});

module.exports = router;
