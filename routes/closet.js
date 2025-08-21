var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('closet/index', { 
    title: 'Your Closet',
  });
});

router.post('/', function(req, res) {
  res.send('Add a new item to the closet');
});

module.exports = router;
