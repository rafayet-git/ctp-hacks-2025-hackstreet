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
  let query = `SELECT * FROM outfits WHERE id=${req.params.id}`;
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
  // First create outfit
  let query1 = "INSERT INTO outfits () VALUES ()";
  let outfit_id = null;
  db.query(query1, (err, result) => {
    if (err) throw err;
    outfit_id = result.insertId;
    // console.log("1 record inserted",result);
    let query2 = [];
    for (article_id of req.body.item){
      query2.push(`INSERT INTO outfit_articles (outfit_id, article_id) VALUES (${outfit_id},${article_id})`);
    }
    db.query(query2.join("; "), (err, result) => {
      if (err) throw err;
      res.redirect(`/outfits/${outfit_id}`);
    });
  });
  // For each item in the list of items:
  //    Add a row to junction table with article_id = item and outfit_id = id of newly-created outfit
  // res.redirect(`/outfits/1`) // TODO: replace 1 with id of newly-created outfit
});

module.exports = router;
