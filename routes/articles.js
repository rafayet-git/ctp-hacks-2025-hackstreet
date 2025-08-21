var express = require('express');
var router = express.Router();

/* GET articles listing. */
router.get('/', function(req, res, next) { // INDEX
  res.render('articles/index', {
    title: 'Articles'
  });
});
router.get('/new', (req, res, next) => {
  res.render('articles/new', {
    title: 'Create article'
  });
});
router.post('/new', (req, res, next) => {
  // TODO: validate data
  // TODO: save data in DB
  res.redirect('articles/1');
});

module.exports = router;
