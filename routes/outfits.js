var express = require('express');
var router = express.Router();
const db = require('../db');
const e = require('express');

/* GET outfits listing. */
router.get('/', (req, res, next) => { // INDEX
  // Get all outfits from database with their associated articles
  let query = `
    SELECT 
      o.id as outfit_id,
      o.likes,
      GROUP_CONCAT(
        CONCAT(a.brand, ' ', a.category, ' (', a.color, ' ', a.pattern, ')')
        SEPARATOR ', '
      ) as articles
    FROM outfits o
    LEFT JOIN outfit_articles oa ON o.id = oa.outfit_id
    LEFT JOIN article a ON oa.article_id = a.id
    GROUP BY o.id, o.likes, o.created_at
    ORDER BY o.created_at DESC
  `;
  
  db.query(query, (err, result, fields) => {
    if (err) throw err;
    res.render('outfits/index', {
      title: 'Outfits',
      outfits: result
    });
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

// API endpoint to get outfit details by ID (returns JSON)
router.get('/api/:id', (req, res, next) => {
  let query = `
    SELECT 
      o.id as outfit_id,
      o.likes,
      GROUP_CONCAT(
        CONCAT(a.brand, ' ', a.category, ' (', a.color, ' ', a.pattern, ')')
        SEPARATOR ', '
      ) as articles
    FROM outfits o
    LEFT JOIN outfit_articles oa ON o.id = oa.outfit_id
    LEFT JOIN article a ON oa.article_id = a.id
    WHERE o.id = ${req.params.id}
    GROUP BY o.id, o.likes, o.created_at
  `;
  
  db.query(query, function (err, result, fields) {
    if (err) throw err;
    if (result.length === 0) 
      return res.status(404).json({ error: 'Outfit not found' });
    res.json(result[0]);
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

// GET route to handle liking an outfit
router.get('/:id/like', (req, res) => {
  const outfitId = req.params.id;
  let query = `UPDATE outfits SET likes = COALESCE(likes, 0) + 1 WHERE id = ${outfitId}`;
  
  db.query(query, (err, result) => {
    if (err) throw err;
    res.redirect('/outfits');
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
    console.log("1 record inserted",result);
    
    // Insert outfit articles all at once
    const articles = req.body.item;
    if (!articles || articles.length === 0) {
      return res.redirect(`/outfits/${outfit_id}`);
    }

    const values = articles.map(article_id => `(${outfit_id}, ${article_id})`).join(', ');
    const query2 = `INSERT INTO outfit_articles (outfit_id, article_id) VALUES ${values}`;

    db.query(query2, (err, result) => {
      if (err) throw err;
      res.redirect(`/outfits/${outfit_id}`);
    });
  });
  // For each item in the list of items:
  //    Add a row to junction table with article_id = item and outfit_id = id of newly-created outfit
  // res.redirect(`/outfits/1`) // TODO: replace 1 with id of newly-created outfit
});

module.exports = router;
