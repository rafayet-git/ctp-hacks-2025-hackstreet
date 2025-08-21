var express = require('express');
var router = express.Router();
const db = require('../db');

/* GET articles listing. */
router.get('/', function(req, res, next) { // INDEX
  let query = `SELECT * FROM article`;
  db.query(query, (err, result, fields) => {
    if (err) throw err;
    res.render('articles/index', {
      title: 'My clothes',
      articles: result
    });
  });
});
router.get('/new', (req, res, next) => { // NEW
  res.render('articles/new', {
    title: 'Create article'
  });
});
router.get('/:id', (req, res, next) => { // SHOW
  let query = `SELECT * FROM article WHERE id=${req.params.id}`;
  db.query(query, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.render('articles/show', {
      title: `${result[0].color} ${result[0].category}`,
      article: result[0]
    });
  });
});
router.post('/new', (req, res, next) => { // CREATE
  // TODO: validate data
  // TODO: save data in DB
  let sql = `INSERT INTO article (brand, category, color, pattern) VALUES ('${req.body.brand}', '${req.body.category}', '${req.body.color}', '${req.body.pattern}')`
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.redirect('/');
});

module.exports = router;
