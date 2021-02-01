var userID;
var filmphoto = [];
var movieinfo = [];
var movietitle = [];
var userMoviesID = [];
function callData(){ 
    document.getElementById('content2').innerHTML='';
    //document.getElementById('logout').innerHTML= '<a  href="/" class="nav-link"id="Anchor2" onclick="localStorage.clear()">Logout</a>';
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
    var photolist = document.querySelectorAll(".wrap-icon");
    var infolist = document.querySelectorAll(".movieinfo");
    var titlelist = document.querySelectorAll(".movietitle");
    var PopularFilms = document.querySelectorAll(".feature-v1");
    
    for (let i = 0; i < PopularFilms.length; i++) {
        titlelist[i].innerHTML = movietitle[i];
        infolist[i].innerHTML = movieinfo[i];
        photolist[i].innerHTML = "<img src=" + filmphoto[i] + ">";
  } 
  }
function validate(){
    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    //console.log(username);
    fetch('/user/login')
    .then(response => response.json())
    .then(data => {
        
	for (var i = 0; i < data.users.length; i++) {
       if (username == data.users[i].emailAddress){
            
            var id = data.users[i].userId;
            passwordcheck()
       } else{
            }
        }   
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
     var userID = sessionStorage.getItem(UserID);
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


function Details(x,ActorId){
  document.getElementById("details").addEventListener("click", function() {
    alert(x);
    fetch('https://api.themoviedb.org/3/person/'+ ActorId +'?api_key=d43b2cf37b68ac54e47dbe77c0b7edb6&language=en-US')
    .then(response => response.json())
    .then(data => {
      //for (i=0;i<data.results.length;i++){
        var list='';
        console.log(data);
         list += ('<div class="col-md-6 col-lg-4 mb-4">'+
            '<div class="feature-v1">'+
            '<div class="wrap-icon mb-3"><img src="https://image.tmdb.org/t/p/w300'+ data.profile_path+
            '"></div>'+
            '<h3 class="movietitle">'+ x +'</h3>'+
            '<p class="movieinfo">'+data.biography+' </p>'+
            '</div>'+
            '</div>');
      // }
      console.log(list);
      document.getElementById("row").innerHTML=list;
    });
  });
}
// key for MOVIE API d43b2cf37b68ac54e47dbe77c0b7edb6 function for getting top 6 populat movies 







let PopularMovies = async ()=>{
    const request ={
        method : 'GET',
        headers : { 
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=d43b2cf37b68ac54e47dbe77c0b7edb6&query=sort_by=popularity.desc&language=en', request)
        const json = await response.json();
        // console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}
let Home = {
    render : async () => {
        let popular = await PopularMovies()
        let view =  //'hello'
        /*html*/
        ` <section class="section">
                <h1> Home </h1>
                <ul>Hello</ul>
            </section> 
        `
        /*html*/
            /*` <section class="section">
                <h1> Home </h1>
                <ul>
                    ${ posts.map(post => 
                        /*html*/
                        /*`<li><a href="#/p/${post.id}">${post.title}</a></li>`).join('\n ')
                    }
                </ul>
            </section> 
        `*/
                   
        return view
    }
    , after_render: async getHTML(){
        return '';
    }

}

export default Home;



const onNavigate = (pathname) => {
    window.history.pushState(
      {},
      pathname,
      window.location.origin + pathname
    )
    rootDiv.innerHTML = routes[pathname]
  }
  
  window.onpopstate = () => {
    rootDiv.innerHTML = routes[window.location.pathname]
  }
 

  export function HomeData(){
    $.ajax({
       type: "GET",
       url: "https://api.themoviedb.org/3/discover/movie?api_key=d43b2cf37b68ac54e47dbe77c0b7edb6&query=sort_by=popularity.desc&language=en",
       dataType: 'json',
       success: function(data) {
          var total =[];
           for(var i=0;i< 9;i++){
              total.push(data.results[i])
           }
           callback(total);
           ;
       }
       
   });
  // return '7';
       
    };
    
 function callback(data){
    console.log(data);
    var html=''
    for (let x=0; x< data.length; x++){
       console.log(data[x].original_title);
       html += data[x].original_title
    }
    console.log(html);
   return html;
 }
 
 function Profile(){
    var userMoviesID =[];
     var userID = sessionStorage.getItem('UserID');
    fetch('/logininfo')
    .then(response => response.json())
    .then(data => {
        let length = data.users[userID].storedMovies.length
        for (let i=0; i < length; i++){
            userMoviesID.push((data.users[userID].storedMovies[i]));
        } 
        
        userMovies(userMoviesID);
        return;
        
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }  
  $(document).on('click','#add',function(){
  
    document.getElementById('row').innerHTML='';
    var newForm = `<form>
    <label for="options">Search For:</label>
    <input type="text" placeholder="Search Movies to Add to Profile">
    <button id="addsearch" type="button">Search</button>
    </form>
    `;
    document.getElementById('content2').innerHTML= newForm;
  });
  <a href="/profile?add"><button id="add">Add Movies To Profile</button></a>
  function HomePage(){
    var html='';
    var titles = [];
    var photos =[];
    var info =[];
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=d43b2cf37b68ac54e47dbe77c0b7edb6&query=sort_by=popularity.desc&language=en')
    .then(response => response.json())
      .then(data => {
        for (let x=0; x<9; x++){
        titles.push(data.results[x].original_title);
        photos.push('<img src="https://image.tmdb.org/t/p/w300' +data.results[x].poster_path + '">');
        info.push(data.results[x].overview);
        }
        sessionStorage.setItem('movietitles', JSON.stringify(titles));
        sessionStorage.setItem('moviephotos', JSON.stringify(photos));
        sessionStorage.setItem('movieinfo', JSON.stringify(info));
      });
      var storedtitles = JSON.parse(sessionStorage.getItem("movietitles"));
      var storedphotos = JSON.parse(sessionStorage.getItem("moviephotos"));
      var storedinfo = JSON.parse(sessionStorage.getItem("movieinfo"));
      for (let i = 0; i < JSON.parse(sessionStorage.getItem("movietitles")).length; i++) {
        html += ('<div class="col-md-6 col-lg-4 mb-4">'+
        '<div class="feature-v1">'+
        '<div class="wrap-icon mb-3">'+storedphotos[i]+
        '</div>'+
        '<h3 class="movietitle">'+storedtitles[i]+'</h3>'+
        '<p class="movieinfo">'+storedinfo[i]+' </p>'+
        '</div>'+
        '</div>');
      }
      //console.log()
      //return ('<div id="row" class="row gutter-v3">'+ html + '</div>');
  }