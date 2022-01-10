# このプログラムについて
sekappy_challengeの課題3に向けて制作した，TCG用のデッキ管理アプリです．

このプログラムには，express+ejsが使用されています．

多様なTCGに対して使うことを想定したため，デッキレシピ登録機能等は実装していません．お好きなTCGに合わせて改造してください．

# 起動方法
自分のPCをサーバにする場合，このファイルと同じ階層に移動してnpm startを起動してください．

# 各種ファイル説明
## /data/decks
デッキのデータが収められたファイルを保存する場所です．
## /routes/*.js
名前に対応するページのサーバ側の処理です．GETされた時の処理や，POSTされた時の処理が記述されます．

## /views/*.ejs
名前に対応するページの表示を作るプログラムです．

##  /fileio.js
デッキファイルの読み出し書き込みなど，ファイル入出力を担当するプログラムです．

## /manipulateDeck.js
戦歴の削除や追加，デッキ名の変更，新規デッキの作成など，デッキの操作を担当するプログラムです．

## /templates.js
デッキの雛形と戦歴の雛形が記述されたプログラムです．

## /valuesOnVolatileMemory.js
サーバのメモリ上に保存される値が記述されたプログラムです．現状，次のデッキに振るデッキIDのみが収録されています．

# 各種命名規則(改造する人向け)
デッキID: 正の整数

デッキIDの振り方: そのデッキが何番目に作られたかのみを考慮します．欠番が存在することがあります．

デッキのファイル名: {デッキID}.json ※{}はメタ構文変数

