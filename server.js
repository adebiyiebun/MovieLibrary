const path = require('path');
const baseURL = 'http://localhost:8080'; // 'http://localhost:8080';
var fs = require('fs');
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();

  app.use(express.static('public'));
  
  //app.get("/*", function (request, response){ //show this file when the "/" is requested
    //  response.sendFile(path.resolve("public",  __dirname +"/public/index.html")); //shows the html page through server
  //});
  
  app.get("/users/login", function (request, response){ //show this file when the "/" is requested
  response.sendFile(__dirname+"/public/data.json"); //shows the html page through server
  //console.log(response);
});
app.get("/users/register", function (request, response){ //show this file when the "/" is requested
  response.sendFile(__dirname+"/public/data.json");
  
});
app.get("/searchpage/:type/:id", function (request, response){ //show this file when the "/" is requested
  response.sendFile(__dirname+"/public/movie.json"); //shows the html page through server
});
app.get("/*", function (request, response){ //show this file when the "/" is requested
      response.sendFile(path.resolve("public", __dirname+"/public/index.html")); //shows the html page through server
  });
  app.listen(8080); //starts the server
 
console.log('Server running at http://127.0.0.1:8080/');
