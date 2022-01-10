const fs = require('fs')
const config = require('./config.js')
//サーバのメモリ上に配置する値を管理する．

let valuesOnVolatileMemory = {
    nextID: -1,
};

const lsFiles = fs.readdirSync(config.directoryOfDeckFile,{withFileTypes: true});

/*サーバ起動時，次に割り振るIDを決定する．新しいIDが割り振られるたび，その場で次に割り振るIDが決定される．IDは通し番号で，欠番がないとは限らない．
起動後はデッキを新規作成した時にだけnextIDが変化する．
*/
valuesOnVolatileMemory.nextID = (()=>{
    let maximum = 0;
    lsFiles.forEach((elem)=>{
        let fileName = elem.name;
        fileName.slice(0,-5);
        console.log(fileName);
        if(parseInt(fileName) > maximum){
            maximum = parseInt(fileName);
        }
    });

    return maximum+1;
})();



module.exports = valuesOnVolatileMemory;