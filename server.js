var http= require ('http') ,
fs = require('fs'), //allows to readwrite file in node
path = require('path'), //detects path
host = '127.0.0.1',
port = '9000';

var mimes = {
  '.html':"text/html",
".css":"text/css",
".js":"text/javascript",
".gif":"image/gif",
".jpg":"image/jpeg",
".png":"image/png"
}

var server = http.createServer(function (req, res){//createServer allows us to instaciate a server in node.js
  var filepath= (req.url === '/')?('client/index.html') : ('.'+req.url);
  var contentType= mimes[path.extname(filepath)];
  //Check to see if file exists
  fs.exists (filepath, function(file_exists){
    if (file_exists){
      //Read and Serve
      fs.readFile(filepath, function(error, content){
        if (error) {
          res.writeHead(500);
          res.end();
        } else{
          res.writeHead(200, {'Content-Type' : contentType});
          res.end(content,'utf-8');
        }
      });
          } else {
      res.writeHead(404);
      res.end ('Cannot find file')
    }
    })

}).listen(port, host, function(){
  console.log('Server Running on http://'+host+':'+port);
});
