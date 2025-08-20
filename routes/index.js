var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Outfit Tracker' });
});
router.get('/outfits/new', function(req, res, next) {
  res.render('outfits/new', { title: 'New Outfit' });
});
router.get('/outfits', function(req, res, next) {
  res.render('outfits/index', { title: 'Outfits' });
});

module.exports = router;
