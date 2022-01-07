let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('deckMake', { 
      title: 'デッキ作成' 
    });
});

module.exports = router;