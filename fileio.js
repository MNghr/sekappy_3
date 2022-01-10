
const fs = require("fs");
const templates = require("./templates.js");
const config = require("./config.js");
//ファイル入出力周りの処理．ファイル保存を行いたくなった先でエラーの詳細を確認したくなったので，これ自体はエラーを投げることにした．


//ファイルにcontentの内容をdirに保存する．dirで指定されたディレクトリが存在し，かつそのディレクトリにdirで指定されたファイルがなければ新規作成する．
const writeFile = async (dir,content)=>{
    try{
        await fs.promises.writeFile(dir,content);
    }catch(err){
        console.log("ファイルが書き込めませんでした");
        console.log(err);
        throw err;
    }
};

//dirで指定されたファイルを読み込む．
const readFile = async (dir) => {
    try{
        const content = await fs.promises.readFile(dir);
        return content;
    }catch(err){
        console.log("ファイルが読み込めませんでした");
        console.log(err);
        throw err;
    }
};

//dirで指定されたファイルを消す．
const deleteFile = async (dir) =>{
    try{
        const content = await fs.promises.unlink(dir);
    }catch (err){
        throw err;
    }
};

//IDで指定されたデッキを保存する．ファイルがなければ新規作成する．
const writeDeckFile = async (deckID,deck) =>{
    if(deckID === undefined){
        throw 'deckID is undefined.';
    }
    const result = await writeFile(config.directoryOfDeckFile+deckID+config.extendOfDeckFile,JSON.stringify(deck)) ;
    
    return result;
};

//IDで指定されたデッキを読み込む．
const readDeckFile = async (deckID) =>{
    let result = await readFile(config.directoryOfDeckFile+deckID+config.extendOfDeckFile);
    result = JSON.parse(result);
    let temporaryTemplate = JSON.parse(JSON.stringify(templates.deck));
    
    return JSON.parse(JSON.stringify(Object.assign(temporaryTemplate,result)));
};

//IDで指定されたデッキを削除する．
const deleteDeckFile = async (deckID) =>{
    await deleteFile(config.directoryOfDeckFile+deckID+config.extendOfDeckFile)
};

//デッキのファイル名の一覧を取得する
const lsDeckList = async () => {
    const result = await fs.promises.readdir(config.directoryOfDeckFile,{withFileTypes:true});
    return result;
};

//デッキのファイルを全て読み込み，このプログラムで扱えるようにする．
const getListOfDecks = async () =>{
    const ls = await lsDeckList();
    const result = await Promise.all(ls.map(async (elem)=>{
        let deckID = JSON.parse(JSON.stringify(elem.name));
        deckID = deckID.slice(0,-5);
        console.log(deckID)
        return await readDeckFile(deckID);
    }));
    console.log(result);
    return result;
};

const fileio = {
    writeFile: writeFile,
    readFile: readFile,
    writeDeckFile: writeDeckFile,
    readDeckFile: readDeckFile,
    deleteDeckFile: deleteDeckFile,
    lsDeckList: lsDeckList,
    getListOfDecks: getListOfDecks,
    deleteFile: deleteFile,
    deleteDeckFile: deleteDeckFile
};

module.exports = fileio;