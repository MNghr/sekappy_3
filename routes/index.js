let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { 
    title: 'あなたのデッキ',
    decks: [],
  });
});

module.exports = router;
