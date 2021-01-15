let indexFile;
var url = require("url");
var path = url.parse(request.url).pathname;
const fs = require('fs').promises;
http = require("http")

http.createServer(function (request, response) {
    switch (path){
        case '/index.html':
                fs.readFile(__dirname + path, function(error,data){
                    indexFile = path;
                    if (error){
                        response.writeHead(404);
                        response.write(error);
                        response.end();
                    
                    } else{
                        response.writeHead(200, {'Content-Type': 'text/html'});
                        response.write(data);
                        console.log(data);
                        response.end();
                    }
                })
    }
    
}).listen(8080);

//console.log('Server running at http://127.0.0.1:8080/');
//console.log(indexFile);
