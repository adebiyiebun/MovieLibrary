const path = require('path');
  var express = require("express");
  var app = express();

  app.use(express.static('public'));
  
  app.get("/", function (request, response){
      //show this file when the "/" is requested
      response.sendFile(__dirname+"/index.html"); //shows the html page through server
  });
  app.listen(8080); //starts the server
  
 


console.log('Server running at http://127.0.0.1:8080/');

