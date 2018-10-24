const express = require('express');
const passport = require('passport')
const router = express.Router();

router.get('/', function(req, res) {
  if (req.user) {
    res.redirect('/')
  } else {
    res.render('login');
  }
});

router.post('/', passport.authenticate('local', { 
  successRedirect: '/', 
  failureRedirect: '/login'
}));

module.exports = router;