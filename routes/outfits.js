var express = require('express');
var router = express.Router();

/* GET outfits listing. */
router.get('/new', (req, res, next) => {
  res.render('outfits/new', { 
    title: 'New Outfit',
  });
});
router.get('/:id', (req, res) => {
  // ~~~logic for using :id to get outfit from DBMS goes here~~~
  res.render('outfits/show', { 
    outfit: { title: "Test" },
    title: 'Outfit Details'
  });
});
router.get('/', (req, res, next) => {
  // TODO: get all outfits for a specific user from DBMS
  res.render('outfits/index', { 
    title: 'Outfits'
  });
});
router.post('/new', (req, res, next) => {
  // TODO: validate data and insert new outfit into DB
  res.redirect(`/outfits/1`) // TODO: replace 1 with id of newly created outfit
});

module.exports = router;
