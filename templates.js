//デッキや戦歴のテンプレート．Object.assignと一緒に使うことで，undefinedによるエラーの抑制を期待できる．

const templates = {
    deck:{
        deckName:"",
        deckID: -1,
        battleHistory:[],
    },
    battleResult: {
        opponentDeckName:"名無し",
        playOrDraw: 0,
        resultsOfGames:[]
    }

}


module.exports = templates;