let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  ( async ()=>{
    res.render('index', { 
      title: 'セカチャレ課題3',
      decks: [],
    });
  })().catch(next)
});

module.exports = router;
