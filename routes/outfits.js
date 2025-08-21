var express = require('express');
var router = express.Router();
const db = require('../db');

/* GET outfits listing. */
router.get('/', (req, res, next) => { // INDEX
  // TODO: get all outfits for a specific user from DBMS
  res.render('outfits/index', {
    title: 'Outfits'
  });
});
router.get('/new', (req, res, next) => { // NEW (make sure this route comes BEFORE the SHOW route in this file)
  let query = `SELECT * FROM article`;
  db.query(query, (err, result, fields) => {
    if (err) throw err;
    res.render('outfits/new', {
      title: 'New Outfit',
      articles: result
    });
  });
});
router.get('/:id', (req, res) => { // SHOW
  // ~~~logic for using :id to get outfit from DBMS goes here~~~
  let query = `SELECT * FROM outfit WHERE id=${req.params.id}`;
  db.query(query, (err, result, fields) => {
    if (err) throw err;
    res.render('outfits/show', {
      title: 'Outfit Details',
      outfit: result[0]
    });
  });
  
});
router.post('/new', (req, res, next) => { // CREATE
  // TODO: validate data and insert new outfit into DB
  res.redirect(`/outfits/1`) // TODO: replace 1 with id of newly created outfit
});

module.exports = router;
