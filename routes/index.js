var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.visits) {
    req.session.visits = 1;
  } else {
    req.session.visits += 1;
  }

  res.render('index', {
    title: 'Express',
    visits: req.session.visits,
  });
});

module.exports = router;
