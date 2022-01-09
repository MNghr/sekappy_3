//const { writeFile, readFile } = require("fs");
fs = require("fs").promises

const writeFile = async (dir,content)=>{
    try{
        await fs.writeFile(dir,content);
    }catch(err){
        console.log("ファイルが書き込めませんでした");
        console.log(err);
        throw err;
    }
};

const readFile = async (dir) => {
    let content;
    try{
        content = await fs.readFile(dir);
    }catch(err){
        console.log("ファイルが読み込めませんでした");
        console.log(err);
        throw err;
    }
};

const writeDeckFile = async (deckID,deck) =>{
    let result = await writeFile("./data/decks/"+deckID+".json",JSON.stringify(deck)) ;
    return result;
};

const readDeckFile = async (deckID) =>{
    let result = await readFile("./data/decks/"+deckID+".json");
    return result;
};

const deleteDeckFile = async (deckID) =>{

};

fileio = {
    writeFile: writeFile,
    readFile: readFile,
    writeDeckFile: writeDeckFile,
    readDeckFile: readDeckFile,
    deleteDeckFile: deleteDeckFile
};

module.exports = fileio