# mdict
mdict (*.mdd *.mdx) file reader based on https://github.com/jeka-kiselyov/mdict, improvement imcludes :
1. Node.js /browser support
2. HTML5 FILE API/ fs stream/ajax support
3. fix require import path problem
4. simpler promise api

VERY THANKS TO [fengdh](https://github.com/fengdh/mdict-js) and  [jeka-kiselyov](https://github.com/jeka-kiselyov/mdict)

# usage

```bash
npm install mdict-js
```

## in browser:
// firstly the mdd/mdx file should be load as a Blob instance
// you can use this code to load the file
```javascript
/**
 * loadblob load blob object from chrome file system by XMLHttpRequest
 * @param url the url which need to load
 * @return A Promise instance will be returned, the `resolve`'s param is A `Blob` instance
 * example:
 *  var loadblob = require("./utils/loadblob.js");
 *  loadblob("text.txt").then(function(file){
 *    if (file instanceof Blob){
 *       console.log(true);
 *    }
 *  });
 *
 *  this will output `true`
 */
module.exports = function(url){
    return new Promise(function(resolve,reject){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";//force the HTTP response, response-type header to be blob

        xhr.onload = function()
        {
            resolve(xhr.response) //xhr.response is now a blob object
        }

        xhr.onerror = function(err){
          console.log(err);
          console.log(url);
          reject(err);
        }
        xhr.send();
    });
}

```
then you can use mdict in browser:
```javascript
function Medict(dict_path){
  this.dictionary = loadblob(dict_path).then(
    function(file){
      console.log(file);
      return mdict(file)
    });

  this.search = function(word){
    return this.dictionary.then(function(dict){
      return dict.search(word).then(function(foundWords){
          var w = '' + foundWords[0];
          return dict.lookup(w); /// typeof w === string
      });
    });
  }
}


// use medict object as:

var medict = new Medict(getceurl(__dirname,"../../dict/yourdict.mdx"));

medict.search("yourword").then(function(definition){
	console.log(definition + "");
});


```


## in node:

```javascript
var mdict = require("./index.js");

(function(){
    mdict("./testdict/ETDict.mdx").search("hello").then(function(defination){
           console.log(defination);
    });
})();
```


# originally description:

node.js mdict (*.mdx, *.mdd) file reader

Rude refactoring of https://github.com/fengdh/mdict-js to make it work on nodejs by [Jeka Kiselyov](https://github.com/jeka-kiselyov).
Done enough to make it work for my project(with predefined dictionaries). It's tested with few .mdx files only, so there may be some bugs with other dictionaries. Please check and please feel free to submit pull requests with optimizations, unit tests etc.

Released under terms of the MIT License, as original library.

This is [on GitHub](https://github.com/jeka-kiselyov/mdict).
