const express = require('express');
const dbError = require('../database/errorCodes');
const User = require('../models/users');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('register');
});

router.post('/', function(req, res, next) {
  const { email, username, password } = req.body;

  User.generatePasswordHash(password)
    .then(passwordHash => User.createUser(email, username, passwordHash))
    .then(results => results.rows)
    .then(user => res.redirect('/users'))
    .catch(error => {
      if (error.code = dbError.unique_violation) {
        const fieldName = (error.detail.match(/email/)) ? 'email' : 'username';
        res.render('register', { message: `${fieldName} is already registerd`});
      }
    });
});

module.exports = router;