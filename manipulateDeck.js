let express = require('express')
let valuesOnMemory = require('./valuesOnMemory.js')
let fileio = require('./fileio.js')

allocateDeckID = async ()=>{
    valuesOnMemory.nextID += 1;
    return valuesOnMemory.nextID - 1;
}

let manipulateDeck = {
    createNewDeck : async (deckName)=>{
        const deck={
            deckID: valuesOnMemory.nextID++,
            deckName : deckName,
            battleHistory : []
        }
        console.log(deck);
        try{
            await fileio.writeDeckFile(deck.deckID,deck);
        }catch(err){
            valuesOnMemory.nextID--;
        }
    },

    deleteDeck : async (deckID)=>{

    },


}

module.exports = manipulateDeck