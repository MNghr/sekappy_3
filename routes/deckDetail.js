let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.redirect('/')
});

router.post('/', (req,res,next) =>{
  (async ()=>{
    res.render('deckDetail', { 
      title: 'デッキの詳細',
      battleHistory: [],
      deckName:"クローティスコントロール"
  
    });
  })().catch(next)
})

module.exports = router;