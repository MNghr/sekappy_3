let express = require('express');
let router = express.Router();
let manipulateDeck = require("../manipulateDeck.js");

/* GET home page. */
router.get('/', (req, res, next) => {
    (async ()=>{
      res.render('deckMake', { 
        title: 'デッキ登録' ,
        mode: 'gotten',
        deckName: ""
      });
    })().catch(next)
});

router.post('/',(req, res, next) =>{
    (async ()=>{
        if(req.body.deckName === ''){
            req.body.deckName = '名無し'
        }
        try{
            await manipulateDeck.createNewDeck(req.body.deckName);
        }catch (err){
            res.render('deckMake', { 
                title: 'デッキ登録エラー' ,
                mode: 'error',
                deckName: req.body.deckName
            });
        }

        console.log("deckMake.post")
        res.render('deckMake', { 
            title: 'デッキ登録完了' ,
            mode: 'posted',
            deckName: req.body.deckName
          });
    })().catch(next)
});
module.exports = router;