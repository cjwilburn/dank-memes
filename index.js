var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download('https://i.ytimg.com/vi/Uv5shWPfqvA/maxresdefault.jpg', 'shrek.png', function(){
  console.log('Shrek downloaded!');
});
exports.printMsg = function() {
  console.log("Only the dankest of memes here. Accept nothing less.");
}
