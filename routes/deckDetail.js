let express = require('express');
const manipulateDeck = require('../manipulateDeck.js');
let router = express.Router();
const templates = require('../templates');
//デッキ詳細のバックエンドを担当
const title="デッキ詳細";

//GET時の処理
router.get('/', (req, res, next) => {
  (async ()=>{
    if(req.query.deckID === undefined){
      res.redirect('/')
    }else{
      try{
        const deck = await manipulateDeck.readDeckFile(req.query.deckID);
        res.render('deckDetail', { 
          title: title,
          mode: 'showDeckDetail',
          status: 'complete',
          message: '',
          deck:deck
        });
      }catch{
        res.render('deckDetail', { 
          title: title,
          message: 'エラー:デッキ読み込みに失敗しました',
          status: 'error',
          mode: 'error'
        });
      }
    }
  })().catch(next);
});

//POST時の処理
router.post('/', (req,res,next) =>{
  (async ()=>{
    if(req.body.mode==='addBattleHistory' && req.body.deckID !== undefined){
      console.log(req.body);
      try{
        let deck = await manipulateDeck.readDeckFile(req.body.deckID);
        console.log(deck)
        let result = JSON.parse(JSON.stringify(templates.battleResult));
        
        result.playOrDraw = req.body.playOrDraw;
        if(req.body.opponentDeckName === ''){
          req.body.opponentDeckName = '名無しのデッキ';
        }
        if(req.body.matchType === '1'){
          req.body.result_2 = null;
          req.body.result_3 = null;
        }else if(req.body.matchType === '3'){
          if(req.body.result_2 == null || (req.body.result_1 !== req.body.result_2 && req.body.result_3 == null))
            throw 'can not determine match result.';
        }

        if(!(req.body.result_1 !== undefined)){
          throw 'result_1 is not defined．result_1 is required.'
        }

        result.resultsOfGames = [req.body.result_1,req.body.result_2,req.body.result_3];
        result.opponentDeckName = req.body.opponentDeckName;

        deck = await manipulateDeck.addBattleHistoryWithWrite(deck,result);

        res.render('deckDetail', { 
          title: title,
          mode: 'completeSaveDeck',
          message: '戦歴が登録されました',
          status:'complete',
          deck:deck
        });
      }catch (err){
        res.render('deckDetail', { 
          title: title,
          message: 'エラー:戦績の登録に失敗しました',
          status: 'error',
          mode: 'error'
        });
        console.log(err)
      }
    }else if(req.body.deckName !== undefined && req.body.deckID !== undefined){
      console.log('デッキ名変更')
      try{
        let deck = await manipulateDeck.readDeckFile(req.body.deckID);
        console.log(deck);
        deck = await manipulateDeck.changeDeckNameWithWrite(deck,req.body.deckName);

        res.render('deckDetail', { 
          title: title,
          mode: 'completeSaveDeck',
          message: 'デッキ名の変更が完了しました',
          status:'complete',
          deck:deck
        });
      }catch(err){
        console.log(err)
        res.render('deckDetail', { 
          title: title,
          message: 'エラー:デッキ名の変更に失敗しました',
          status: 'error',
          mode: 'error',
        });
      }
    }else if(req.body.mode==='deleteBattleHistory' && req.body.deckID !== undefined && req.body.index !== undefined){
      try{
        let deck = await manipulateDeck.readDeckFile(req.body.deckID);
        if(parseInt(req.body.index) < 0 || parseInt(req.body.index) >= deck.battleHistory.length){
          throw 'index is out of bounds.';
        }

        deck = await manipulateDeck.deleteBattleHistoryWithWrite(deck,parseInt(req.body.index));
        
        res.render('deckDetail', { 
          title: title,
          message: '戦歴の消去が完了しました',
          status:'complete',
          deck:deck
        });
      }catch (err){
        console.log(err);
        res.render('deckDetail', { 
          title: title,
          message: 'エラー:戦歴の消去に失敗しました',
          status: 'error',
          mode: 'error',
        });
      }
    }else{
      res.render('deckDetail', { 
        title: title,
        message: 'エラー:無効なリクエストです',
        status: 'error',
        mode: 'error',
      });
    }
  })().catch(next);
})

module.exports = router;