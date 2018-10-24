var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.visits) {
    req.session.visits = 1;
  } else {
    req.session.visits += 1;
  }

  const username = req.user ? req.user.username : '';

  res.render('index', {
    title: 'Express',
    visits: req.session.visits,
    loggedIn: req.user,
    username,
  });
});

module.exports = router;
