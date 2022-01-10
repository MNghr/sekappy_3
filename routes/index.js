let express = require('express');
let router = express.Router();
let manipulateDeck = require('../manipulateDeck.js')
//トップページ兼デッキ一覧のバックエンドを担当

router.get('/', (req, res, next) => {
  ( async ()=>{
    try{
      const decks = await manipulateDeck.getListOfDecks();
      console.log(decks);

      res.render('index', { 
        title: 'セカチャレ課題3',
        decks: decks,
      });
    }catch (err){
      console.log(err);
      res.render('index', { 
        title: '',
        decks:[]
      });
    }
  })().catch(next)
});

module.exports = router;
