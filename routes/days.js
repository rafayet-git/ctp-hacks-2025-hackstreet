var express = require('express');
var router = express.Router();
const db = require('../db');
const moment = require('moment');

router.get('/:year/:month/:day', (req, res, next) => {
    let rawDate = `${req.params.year}${req.params.month}${req.params.day}`;
    let today = moment(rawDate).format("MMMM Do YYYY");
    let dayStart = moment(rawDate).startOf('day').format();
    let dayEnd = moment(rawDate).endOf('day').format();

    let query = `
    SELECT 
      o.id as outfit_id,
      o.likes,
      GROUP_CONCAT(
        CONCAT(a.brand, ' ', a.category, ' (', a.color, ' ', a.pattern, ')')
        SEPARATOR ', '
      ) as articles
        FROM (SELECT * FROM outfits WHERE created_at BETWEEN '${dayStart}' AND '${dayEnd}') o
        LEFT JOIN outfit_articles oa ON o.id = oa.outfit_id
        LEFT JOIN article a ON oa.article_id = a.id
        GROUP BY o.id, o.likes, o.created_at
        ORDER BY o.created_at DESC
    `;
    db.query(query, (err, result, fields) => {
        if (err) throw err;
        res.render('days/show',{
            title: today,
            outfits: result
        });
    });
});

module.exports = router;