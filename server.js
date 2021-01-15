let indexFile;
const fs = require('fs').promises;
http = require("http")

http.createServer(function (request, response) {
    const requestListener = function(req,resp){
        fs.readFile(__dirname + "/index.html")
        .then(contents =>{
            indexFile = contents;
        
        });
    }
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(indexFile);
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');
console.log(__dirname);