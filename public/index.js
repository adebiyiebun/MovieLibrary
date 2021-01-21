
var userID;

function validate(){
    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(username);
    fetch('/login')
    .then(response => response.json())
    .then(data => {
        
	for (var i = 0; i < data.users.length; i++) {
        console.log(data.users[i].emailAddress);
       if (username == data.users[i].emailAddress){
            
            console.log('correct username');
            var id = data.users[i].userId;
            passwordcheck()
     //       break;
       } else{
           console.log('incorrect email');
            }
        }    
       // }
    
    function passwordcheck(){
            if (password == data.users[id].password){
                alert('Welcome ' + data.users[id].firstName);
                localStorage.setItem("userId", id);
                userID = localStorage.getItem("userId")
                console.log(userID);
                callData()
            }else{
                console.log('incorrect password');
                alert('Ensure Your Details Are Correct')
            }
        
    }
    
});
}
var filmphoto = [];
var movieinfo = [];
var movietitle = [];
var userMovies = [];

// key for MOVIE API d43b2cf37b68ac54e47dbe77c0b7edb6 function for getting top 6 populat movies 
function callData(){
    document.getElementById('content2').innerHTML='';
    document.getElementById('logout').innerHTML= '<a  href="/" class="nav-link"id="Anchor2" onclick="localStorage.clear()">Logout</a>';
    //.innerHTML='<li><a  href="#services-section" class="nav-link"id="Anchor2">Log Out</a></li>'
    
   // console.log(document.getElementById('Anchor'));
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=d43b2cf37b68ac54e47dbe77c0b7edb6&query=sort_by=popularity.desc&language=en')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    
    
   
    
        for (let x=0; x < 6 ; x++){
                
                filmphoto.push("https://image.tmdb.org/t/p/w300" + data.results[x].poster_path);
                movieinfo.push(data.results[x].overview);
                movietitle.push(data.results[x].original_title); 
               // 
                
            }     
            console.log(movieinfo);   
    document.getElementById('container').innerHTML='<div class="section-heading-wrap text-center mb-5" id="content2">'+
    '<h2 id="title" class="heading-h2 text-center divider"><span class="gsap-reveal">Current Popular Movies</span></h2>'+
    '<span class="gsap-reveal"><img src="images/divider.png" alt="divider" width="76"></span>'+
  '</div>'+

  '<div class="row gutter-v3">'+
    '<div class="col-md-6 col-lg-4 mb-4">'+
      '<div class="feature-v1">'+
        '<div class="wrap-icon mb-3">'+
          
        '</div>'+
        '<h3 class="movietitle"></h3>'+
        '<p class="movieinfo"> </p>'+
      '</div>'+
    '</div>'+
    '<div class="col-md-6 col-lg-4 mb-4">'+
      '<div class="feature-v1">'+
        '<div class="wrap-icon mb-3">'+
          
        '</div>'+
        '<h3 class="movietitle"></h3>'+
        '<p class="movieinfo"> </p>'+
      '</div>'+
    '</div>'+
      
    '<div class="col-md-6 col-lg-4 mb-4">'+
    '<div class="feature-v1">'+
      '<div class="wrap-icon mb-3">'+
        
      '</div>'+
      '<h3 class="movietitle"></h3>'+
      '<p class="movieinfo"> </p>'+
    '</div>'+
  '</div>'+
  '<div class="col-md-6 col-lg-4 mb-4">'+
  '<div class="feature-v1">'+
    '<div class="wrap-icon mb-3">'+
      
    '</div>'+
    '<h3 class="movietitle"></h3>'+
    '<p class="movieinfo"> </p>'+
  '</div>'+
'</div>'+
'<div class="col-md-6 col-lg-4 mb-4">'+
'<div class="feature-v1">'+
  '<div class="wrap-icon mb-3">'+
    
  '</div>'+
  '<h3 class="movietitle"></h3>'+
  '<p class="movieinfo"> </p>'+
'</div>'+
'</div>'+
'<div class="col-md-6 col-lg-4 mb-4">'+
'<div class="feature-v1">'+
  '<div class="wrap-icon mb-3">'+
    
  '</div>'+
  '<h3 class="movietitle"></h3>'+
  '<p class="movieinfo"> </p>'+
'</div>'+
'</div>'+
        '</div>'+
    '</div>'
    document.onload = populate()
    
    
          // });
       
        

});
}
function populate(){  
    
    var photolist = document.querySelectorAll(".wrap-icon");
    var infolist = document.querySelectorAll(".movieinfo");
    var titlelist = document.querySelectorAll(".movietitle");
    var PopularFilms = document.querySelectorAll(".feature-v1");
    
    for (i = 0; i < PopularFilms.length; i++) {
        titlelist[i].innerHTML = movietitle[i];
        infolist[i].innerHTML = movieinfo[i];
        photolist[i].innerHTML = "<img src=" + filmphoto[i] + ">";
        
       // console.log(photolist[i]);
        //console.log(infolist[i]);
        //console.log(titlelist[i]);
  } 
//console.log(document.getElementById('container'));
}
function Profile(){
    console.log(userID);
     loggedIn(userID);
    fetch('/login')
    .then(response => response.json())
    .then(data => {
        let length = data.users[userID].storedMovies.length
        for (let i=0; i < length; i++){
            userMovies.push((data.users[userID].storedMovies[i]));
        }
        console.log(userMovies);
        
    }) 
}

function loggedIn(){
    //console.log(userID);
    if (userID == null){
        alert('Please Log In First');
        return false;
    } else{
        return userID;
    }

    
}






//} else{
      //  data = $.getJSON('https://api.themoviedb.org/3/movie/'+ key +'?api_key=d43b2cf37b68ac54e47dbe77c0b7edb6'); //insert KEY!!!

