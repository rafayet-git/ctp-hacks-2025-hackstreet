var express = require('express');
var router = express.Router();

/* GET articles listing. */
router.get('/articles', function(req, res, next) {
  res.render('articles/index');
});

module.exports = router;
