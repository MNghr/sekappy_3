let express = require('express');
let router = express.Router();
let manipulateDeck = require("../manipulateDeck.js");
//デッキ新規作成のバックエンドを担当

//GET時の処理
router.get('/', (req, res, next) => {
    (async ()=>{
      res.render('deckMake', { 
        title: 'デッキ登録' ,
        mode: 'gotten',
        deckName: ""
      });
    })().catch(next)
});

//POST時の処理
router.post('/',(req, res, next) =>{
    (async ()=>{
        if(req.body.deckName !== undefined){
            try{
                await manipulateDeck.createNewDeck(req.body.deckName);
                console.log('deckMake.post')
                res.render('deckMake', { 
                    title: 'デッキ登録完了' ,
                    mode: 'posted',
                    deckName: req.body.deckName
                });
            }catch (err){
                res.render('deckMake', { 
                    title: 'デッキ登録エラー' ,
                    mode: 'error',
                    deckName: req.body.deckName
                });
            }
        }else{
            res.render('deckMake', { 
                title: 'デッキ登録エラー' ,
                mode: 'error',
            });
        }
    })().catch(next)
});
module.exports = router;