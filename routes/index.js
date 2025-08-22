var express = require('express');
var router = express.Router();
const moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('home', { 
    title: moment().format("MMMM"),
  });
});

module.exports = router;
