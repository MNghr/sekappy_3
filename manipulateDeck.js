let valuesOnVolatileMemory = require('./valuesOnVolatileMemory.js');
const fileio = require('./fileio.js');
const config = require('./config.js');
const templates = require('./templates.js');
//デッキ周りの操作を担当．デッキ名や戦歴に代表されるデッキ内容の変更，その保存処理を含む
//なお，ここでいう戦歴は対戦相手のデッキや各ゲームの勝敗，戦績は各種勝率を意味する．

//デッキファイルの命名規則は デッキID.JSON　

//デッキを新規作成する
const createNewDeck = async (deckName)=>{
    let deck=JSON.parse(JSON.stringify(templates.deck));
    deck.deckID = valuesOnVolatileMemory.nextID++;
    deck = await changeDeckName(deck,deckName);
    console.log(deck);
    try{
        await fileio.writeDeckFile(deck.deckID,deck);
    }catch(err){
        valuesOnVolatileMemory.nextID--;
        throw err;
    }
};

//指定されたIDのデッキを削除する
const deleteDeckFile = async (deckID) =>{
    await fileio.deleteDeckFile(deckID);
};

//IDで指定されたデッキを読み込む
const readDeckFile = async (deckID) =>{
    const deck = await fileio.readDeckFile(deckID);
    return deck;
};

//IDで指定されたデッキにdeckの内容を書き込む．ファイルがなければ新規作成する
const writeDeckFile = async (deckID,deck) =>{
    await fileio.writeDeckFile(deckID, deck);
};

//サーバに存在するデッキ一覧(ファイル名)を取得する
const lsDeckList = async ()=>{
    const result = await fileio.lsDeckList();
    return result;
};

//サーバに存在するデッキを全て読み込み，プログラム上で使用可能にする
const getListOfDecks = async () =>{
    const result = await fileio.getListOfDecks();
    return result;
};

//戦歴を追加する
const addBattleHistory = async (deck,matchResult) =>{
    let result = JSON.parse(JSON.stringify(deck));
    result.battleHistory.push(matchResult);
    
    return JSON.parse(JSON.stringify(result));
};

//デッキの指定された戦歴を削除する
const deleteBattleHistory = async (deck,index)=>{
    let result = JSON.parse(JSON.stringify(deck));
    result.battleHistory.splice(index,1)
    console.log("result.battleHistory is Array:"+Array.isArray (result.battleHistory));
    
    return JSON.parse(JSON.stringify(result));
};

//デッキの戦歴を追加し，その内容を保存する．変更後のデッキを返す．
const addBattleHistoryWithWrite = async(deck,matchResult) =>{
    const newDeck = await addBattleHistory(deck,matchResult);
    await writeDeckFile(newDeck.deckID,newDeck);
    console.log(newDeck);
    return JSON.parse(JSON.stringify(newDeck));
};

//デッキの指定された戦歴を削除し，その内容を保存する．変更後のデッキを返す．
const deleteBattleHistoryWithWrite = async (deck,index) =>{
    const newDeck = await deleteBattleHistory(deck,index);
    await writeDeckFile(newDeck.deckID,newDeck);
    return JSON.parse(JSON.stringify(newDeck));
};

//デッキ名を変更する
const changeDeckName = async (deck,newName) =>{
    let result = JSON.parse(JSON.stringify(deck));
    if(newName === ''){
        newName= config.defaultName;
    }
    result.deckName = newName;

    return JSON.parse(JSON.stringify(result));
};

//デッキ名を変更し，その内容を保存する
const changeDeckNameWithWrite = async (deck,newName) =>{
    const newDeck = await changeDeckName(deck,newName);
    await writeDeckFile(newDeck.deckID,newDeck);
    
    return JSON.parse(JSON.stringify(newDeck));
};

const manipulateDeck = {
    createNewDeck : createNewDeck,
    deleteDeckFile : deleteDeckFile,
    readDeckFile: readDeckFile,
    lsDeckList : lsDeckList,
    getListOfDecks: getListOfDecks,
    writeDeckFile : writeDeckFile,
    addBattleHistory : addBattleHistory,
    addBattleHistoryWithWrite : addBattleHistoryWithWrite,
    deleteBattleHistory : deleteBattleHistory,
    deleteBattleHistoryWithWrite : deleteBattleHistoryWithWrite,
    changeDeckName: changeDeckName,
    changeDeckNameWithWrite: changeDeckNameWithWrite
};

module.exports = manipulateDeck;