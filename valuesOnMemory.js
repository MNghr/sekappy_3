const fs = require('fs')

valuesOnMemory = {
    nextID: -1,
    fileList: fs.readFileSync("./data/decks",{withFileTypes: true})
};

//サーバ起動時，次に割り振るIDを決定する．新しいIDが割り振られるたび，その場で次に割り振るIDが決定される．IDは通し番号で，欠番がないとは限らない．
valuesOnMemory.nextID = (()=>{
    const files = fs.readdirSync("./data/decks",{withFileTypes: true});
    let maximum = 0;
    files.forEach((elem)=>{
        let fileName = elem.name;
        fileName.slice(0,-5);
        console.log(fileName);
        if(parseInt(fileName) > maximum){
            maximum = parseInt(fileName);
        }
    });

    return maximum+1;
})();


module.exports = valuesOnMemory;