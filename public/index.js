// key for MOVIE API d43b2cf37b68ac54e47dbe77c0b7edb6 function for getting top 6 populat movies 
var userID;
var filmphoto = [];
var movieinfo = [];
var movietitle = [];
var userMoviesID = [];

function validate(){
    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    //console.log(username);
    fetch('/login')
    .then(response => response.json())
    .then(data => {
        
	for (var i = 0; i < data.users.length; i++) {
        //console.log(data.users[i].emailAddress);
       if (username == data.users[i].emailAddress){
            
           // console.log('correct username');
            var id = data.users[i].userId;
            passwordcheck()
     //       break;
       } else{
           //console.log('incorrect email');
            }
        }   
       // alert('Ensure Your Details Are Correct'); 
       // }
    
    function passwordcheck(){
            if (password == data.users[id].password){
                alert('Welcome ' + data.users[id].firstName);
                localStorage.setItem("userId", id);
                userID = localStorage.getItem("userId")
                //console.log(userID);
                callData()
            }else{
                //console.log('incorrect password');
                alert('Ensure Your Details Are Correct')
            }
        
    }
    
})
.catch((error) => {
  console.error('Error:', error);
});
}
function callData(){
    document.getElementById('content2').innerHTML='';
    document.getElementById('logout').innerHTML= '<a  href="/" class="nav-link"id="Anchor2" onclick="localStorage.clear()">Logout</a>';
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=d43b2cf37b68ac54e47dbe77c0b7edb6&query=sort_by=popularity.desc&language=en')
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        for (let x=0; x < 6 ; x++){
                filmphoto.push("https://image.tmdb.org/t/p/w300" + data.results[x].poster_path);
                movieinfo.push(data.results[x].overview);
                movietitle.push(data.results[x].original_title);   
            }     
            //console.log(movieinfo);   
    document.getElementById('container').innerHTML='<div class="section-heading-wrap text-center mb-5" id="content2">'+
    '<h2 id="title" class="heading-h2 text-center divider"><span class="gsap-reveal">Current Popular Movies</span></h2>'+
    '<span class="gsap-reveal"><img src="images/divider.png" alt="divider" width="76"></span>'+
  '</div>'+

  '<div id="row" class="row gutter-v3">'+
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
    document.onload = populate(movietitle,movieinfo,filmphoto)
})
.catch((error) => {
  console.error('Error:', error);
});
}
function populate(){
    //console.log(movietitle);  
    
    var photolist = document.querySelectorAll(".wrap-icon");
    var infolist = document.querySelectorAll(".movieinfo");
    var titlelist = document.querySelectorAll(".movietitle");
    var PopularFilms = document.querySelectorAll(".feature-v1");
    
    for (i = 0; i < PopularFilms.length; i++) {
        titlelist[i].innerHTML = movietitle[i];
        infolist[i].innerHTML = movieinfo[i];
        photolist[i].innerHTML = "<img src=" + filmphoto[i] + ">";
  } 
}
function Profile(){
    //console.log(userID);
     loggedIn(userID);
    fetch('/login')
    .then(response => response.json())
    .then(data => {
        let length = data.users[userID].storedMovies.length
        for (let i=0; i < length; i++){
            userMoviesID.push((data.users[userID].storedMovies[i]));
        } 
        
        userMovies(userMoviesID);
        
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}   
function userMovies(keys){
        //console.log(keys);
        let Uphotolist=[];
        let Uinfolist=[];
        let Utitlelist=[];
        var list='';
        document.getElementById('content2').innerHTML='<h2 id="title" class="heading-h2 text-center divider"><span class="gsap-reveal">Your Saved Movies</span></h2>'+
        '<span class="gsap-reveal"><img src="images/divider.png" alt="divider" width="76"></span>'+
      '</div>';
        
       
        for (i=0;i<keys.length ;i++){
        
       fetch('https://api.themoviedb.org/3/movie/'+ keys[i] +'?api_key=d43b2cf37b68ac54e47dbe77c0b7edb6')
       .then(response => response.json())
       .then(data => {
           //console.log(data);
           Utitlelist = (data.original_title);
           Uinfolist = (data.overview);
           Uphotolist = ("https://image.tmdb.org/t/p/w300" + data.poster_path);
           //console.log(Utitlelist);
           list += ('<div class="col-md-6 col-lg-4 mb-4">'+
            '<div class="feature-v1">'+
            '<div class="wrap-icon mb-3"><img src="'+ Uphotolist+
            '"></div>'+
          '<h3 class="movietitle">'+Utitlelist+'</h3>'+
        '<p class="movieinfo">'+Uinfolist+' </p>'+
      '</div>'+
      '</div>');
      //console.log(list);
      document.getElementById("row").innerHTML=list;
      
       })//;
       .catch((error) => {
        console.error('Error:', error);
      });
       //;

      }
    

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
function SearchPopulate(){ 
  document.getElementById('title').innerHTML='<span class="gsap-reveal">Search Movies</span>';
  document.getElementById('row').innerHTML='';
  var newElement = document.createElement('div');
  newElement.innerHTML='<form class="searchform">'+
  '<label for="options">Search By:</label>'+
  '<select name="options" id="options">'+
    '<optgroup label="Choose:">'+
      '<option value="genres">Genres</option>'+
      '<option value="actors">Actors/Actresses</option>'+
    '</optgroup>'+
  '</select>'+
  '<button onclick="SearchPage()" id="options" type="button">Search</button>'+
'</form>';
  document.getElementById('container').appendChild(newElement);
}
function SearchPage(){
  document.getElementById('content2').innerHTML='<h2 id="title" class="heading-h2 text-center divider"><span class="gsap-reveal"> Search Movies</span></h2>'+
  '<span class="gsap-reveal"><img src="images/divider.png" alt="divider" width="76"></span>'+
  '</div>';
  document.getElementById('row').innerHTML='';
  fetch('/search')
    .then(response => response.json())
    .then(data => {
      var option = document.getElementById('options').value;
      var element = document.getElementById('searchoptions');
      var HTML = '';
      if (option=='genres'){
        for (let i=0;i<data.movies[0].genres.length;i++){
          HTML+= '<option value=        "'+data.movies[0].genres[i].id+'">'+data.movies[0].genres[i].name+'</option>'
        }
      }else if (option=='actors'){
        for (let i=0;i<data.movies[0].actors.length;i++){
          HTML+= '<option value=        "'+data.movies[0].actors[i]+'">'+data.movies[0].actors[i]+'</option>'
        }
      } else{
        alert('Please Choose An Option');
      }
      var newElement = document.createElement('div');
          newElement.setAttribute('id', 'searchoptions');
        newElement.innerHTML='<form id="searchform" class="searchform">'+
                              '<label for="options">'+option+'</label>'+
                              '<select name="options2" id="options2">'+ HTML +
                              '</select>'+
                              '<button onclick="SearchPage2()" id="options" type="button">Search</button>'+
                            '</form>';
        if (element == null){
          document.getElementById('container').appendChild(newElement);
        } else {
          element.parentNode.removeChild(element);
        }
    });
    
    
}
function SearchPage2(){
  
  var list='';
  fetch('/search')
  .then(response => response.json())
  .then(data => {
  var option = document.getElementById('options').value;
  var query ='';
  if (option=='genres'){
    query = document.getElementById('options2').value;
    fetch('https://api.themoviedb.org/3/discover/movie?with_genres='+ query +'&sort_by=popularity.desc&api_key=d43b2cf37b68ac54e47dbe77c0b7edb6')
       .then(response => response.json())
       .then(data => {
        document.getElementById('content2').innerHTML='<h2 id="title" class="heading-h2 text-center divider"><span class="gsap-reveal">'+ (document.getElementById('options2')).options[(document.getElementById('options2')).selectedIndex].text +'s Popular Films</span></h2>'+
        '<span class="gsap-reveal"><img src="images/divider.png" alt="divider" width="76"></span>'+
        '</div>';
        document.getElementById('searchoptions').parentNode.removeChild(document.getElementById('searchoptions'));
        for (i=0;i<6;i++){
          console.log(data.results[i].original_title);
          list += ('<div class="col-md-6 col-lg-4 mb-4">'+
              '<div class="feature-v1">'+
              '<div class="wrap-icon mb-3"><img src="https://image.tmdb.org/t/p/w300'+ data.results[i].poster_path+
              '"></div>'+
              '<h3 class="movietitle">'+data.results[i].original_title+'</h3>'+
              '<p class="movieinfo">'+data.results[i].overview+' </p>'+
              '</div>'+
              '</div>');
        }
        document.getElementById("row").innerHTML=list;
      });
  }else if (option=='actors'){
    query = document.getElementById('options2').value;
    var mainquery = query.replace(" ", "+");
    fetch('https://api.themoviedb.org/3/search/person?api_key=d43b2cf37b68ac54e47dbe77c0b7edb6&query='+mainquery)
       .then(response => response.json())
       .then(data => {
        document.getElementById('searchoptions').parentNode.removeChild(document.getElementById('searchoptions'));
        document.getElementById('content2').innerHTML='<h2 id="title" class="heading-h2 text-center divider"><span class="gsap-reveal">'+query +'s Popular Films</span></h2>'+
        '<span class="gsap-reveal"><img src="images/divider.png" alt="divider" width="76"></span>'+
      '</div>';
         for (i=0;i<data.results[0].known_for.length;i++){
          console.log(data.results[0].known_for[i].original_title);
          list += ('<div class="col-md-6 col-lg-4 mb-4">'+
              '<div class="feature-v1">'+
              '<div class="wrap-icon mb-3"><img src="https://image.tmdb.org/t/p/w300'+ data.results[0].known_for[i].poster_path+
              '"></div>'+
              '<h3 class="movietitle">'+data.results[0].known_for[i].original_title+'</h3>'+
              '<p class="movieinfo">'+data.results[0].known_for[i].overview+' </p>'+
              '</div>'+
              '</div>');
    //console.log(list);
    
         }
         document.getElementById("row").innerHTML=list;
      });
  }
    
  });
}


