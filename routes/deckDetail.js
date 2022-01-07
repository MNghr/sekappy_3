let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('deckDetail', { 
    title: 'デッキの詳細' 
  });
});

module.exports = router;