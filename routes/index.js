let express = require('express');
let router = express.Router();
let manipulateDeck = require('../manipulateDeck.js')
//トップページ兼デッキ一覧のバックエンドを担当

router.get('/', (req, res, next) => {
  ( async ()=>{
    try{
      const decks = await manipulateDeck.getListOfDecks();

      res.render('index', { 
        title: 'セカチャレ課題3',
        status: 'complete',
        message: '',
        decks: decks
      });
    }catch (err){
      console.log(err);
      res.render('index', { 
        title: 'エラー:デッキの取得に失敗しました',
        status: 'error',
        message: '',
        decks:[]
      });
    }
  })().catch(next);
});

router.post('/', (req,res,next) =>{
  ( async ()=>{
    try{
      const deletedDeck = await manipulateDeck.readDeckFile(req.body.deckID);
      await manipulateDeck.deleteDeckFile(parseInt(req.body.deckID));
      console.log('ファイル削除')
      const decks = await manipulateDeck.getListOfDecks();

      res.render('index', { 
        title: 'セカチャレ課題3 トップページ',
        status: 'complete',
        message: 'デッキ「'+deletedDeck.deckName+'」を削除しました．',
        decks: decks
      });
    }catch (err){
      console.log(err);
      res.render('index', { 
        title: 'エラー:デッキの削除に失敗しました．',
        status: 'error',
        message: '',
        decks:[]
      });
    }
  })().catch(next);
});
module.exports = router;
