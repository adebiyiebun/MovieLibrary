const path = require('path');
var fs = require('fs');
const express = require("express");
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false })
const app = express();
app.use(express.static('public'));
var data = fs.readFileSync(__dirname+"/public/data.json");
//var users = JSON.parse(data);
 //console.log(users);
 app.use(jsonParser);
 app.use(urlencodedParser);
app.get("/logininfo", function (request, response){ //show this file when the "/" is requested
  response.sendFile(__dirname+"/public/data.json"); //shows the html page through server
});
app.post("/logininfo", function (request, response, next ){ //show this file when the "/" is requested
  var Users = JSON.parse(data);
  var newUser = (request.body);
  var newId = Users.users.length
  newUser.userId = newId;
  newUser.storedMovies=[];
  Users.users.push(newUser);
  data = JSON.stringify(Users, null, 2);
  fs.writeFile(__dirname+"/public/data.json", data, finished);
  response.writeHead(302 ,{"Location":"http://127.0.0.1:8080/profile"});
  response.end(); 
  function finished(err){
    console.log('all set');
  }

});
app.get("/searchpage", function (request, response){ //show this file when the "/" is requested
  response.sendFile(__dirname+"/public/movie.json"); //shows the html page through server
});
app.post("/add", function(request,response, next){
  
  var Users = JSON.parse(data);
  var actualUser = Users.users[request.body.userId];
  var stored = Users.users[request.body.userId].storedMovies;
  stored.push(request.body.storedMovies);
  actualUser.storedMovies.push(request.body.storedMovies)
  //Users.users.push(actualUser);
  console.log(actualUser);
  data = JSON.stringify(Users, null, 2);
  fs.writeFile(__dirname+"/public/data.json", data, finished);
  response.send('working');
  // response.send('User ' + request.body.userId)
   response.end()
  function finished(err){
    console.log('all set');
   
  }
  
})
app.get("/*", function (request, response){ //show this file when the "/" is requested
      response.sendFile(path.resolve("public", __dirname+"/public/index.html")); //shows the html page through server
  });
app.listen(8080); //starts the server
 
console.log('Server running at http://127.0.0.1:8080/');
