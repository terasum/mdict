var mdict = require("./index.js");

(function(){
    mdict("./testdict/ETDict.mdx").search("hello").then(function(defination){
           console.log(defination);
    });
})();