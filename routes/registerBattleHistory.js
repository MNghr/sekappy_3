let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('registerBattleHistory', {
       title: '戦歴の登録' 
    });
});

module.exports = router;