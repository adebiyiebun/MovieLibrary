

window.onload = function(){
  //CREATING ROUTER 
  var active = Array.from(document.querySelectorAll("[data-link]"));
  function navigate(event){
    event.preventDefault();
   var route = event.target.attributes[1].value;
    var info = firstrouter.routes.filter(function(r) {
      return r.path === route;
    })[0];
    if (!info){
      window.history.pushState({},'name','404');
      ContentDiv.innerHTML='404: Page not Found';
      viewtitle.innerHTML= '404: Page not Found';
    } else {
      window.history.pushState({},'name',info.path);
      viewtitle.innerHTML =info.name;
      ContentDiv.innerHTML = info.component;
    }
  };
  active.forEach(function(route){
    route.addEventListener("click",navigate, false);
  });
 
  var router = function(name,routes,components){
    return {
      name:name,
      routes:routes,
      components: components
    }
  };
  var viewtitle = document.getElementById('title');
  var content = document.getElementById('content2');
  var ContentDiv = document.getElementById('content2');
  var firstrouter = new router('firstrouter',[
    {
      path:'/',
      name: 'Home Page',
      component: HomePage()
     
    },
    {
      path:'/login',
      name: 'Login',
      component: LoginPage()
    },
    {
      path:'/search',
      name: 'Search',
      component: SearchPage()
    },
    {
      path:'/profile',
      name: 'Profile',
     component: ProfilePage2()
    },
    { 
      path:'/register',
      name: 'Register',
      component: RegisterPage()
    }
  ]);
  var curPath = location.pathname;
  if (curPath==='/'){
    viewtitle.innerHTML='Home Page'
    
    ContentDiv.innerHTML=curPath.component;
    var exists = firstrouter.routes.filter(function(r){
      return r.path ===curPath
    })[0];
    if(exists)
     // console.log(exists.name);
      //console.log(exists.component);
      ContentDiv.innerHTML=exists.component;
    }else{
    var exists = firstrouter.routes.filter(function(r){
      return r.path ===curPath
    })[0];
    if(exists){
      viewtitle.innerHTML=exists.name;
      ContentDiv.innerHTML=exists.component;
    } else{
      viewtitle.innerHTML= '404: Page not Found';
    }
  }
}
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
      for (let i = 0; i < storedtitles.length; i++){
        html += ('<div class="col-md-6 col-lg-4 mb-4">'+
        '<div class="feature-v1">'+
        '<div class="wrap-icon mb-3">'+storedphotos[i]+
        '</div>'+
        '<h3 class="movietitle">'+storedtitles[i]+'</h3>'+
        '<p class="movieinfo">'+storedinfo[i]+' </p>'+
        '</div>'+
        '</div>');
      }
        return ('<div id="row" class="row gutter-v3">'+ html + '</div>');

}
function LoginPage(){
  //console.log('login called');
  var html =`<form>
  <div id="searchform">
  <input id="email" type="text" placeholder="Enter Email" required>
  <input id="password" type="text" placeholder="Enter Password" required>
  </div>
  <div class="submit">
  <button id="login" type="button">Login</button>
  <button type="reset">Reset</button>
  <div>`
  return html;
}
$(document).on('click','#login',function(){
  
  if (document.getElementById('password').value == ''){
    alert('Please Enter Your Password');
    return;
  }
  fetch("/logininfo")
  .then(response =>response.json())
  .then(data=>{
    for (let i=0; i< data.users.length; i++){
      if((document.getElementById('email').value)==data.users[i].emailAddress && ((document.getElementById('password').value)==data.users[i].password)){
        console.log('Signed In');
        alert('Welcome '+data.users[i].firstName);
        sessionStorage.setItem('name',data.users[i].firstName);
        sessionStorage.setItem('UserID',data.users[i].userId);

        location.pathname='/';
        return;
      }else{
        console.log('incorrect credentials');
      }
    } 
    console.log(HomePage());
  });    
});
$(document).on('click','#register',function(){
  sessionStorage.setItem('name', document.getElementById('firstName').value)
});
function SearchPage(){
  var html =`<form id="searchform" class="searchform">
  <label for="options">Search By:</label>
  <select name="options" id="options">
  <optgroup label="Choose:">
  <option value="genres">Genres</option>
      <option value="actors">Actors/Actresses</option>
    </optgroup>
  </select>
  <button id="options4" type="button">Search</button>
  </form>
  <div id="row" class="row gutter-v3"></div>`
  return html;
}
$(document).on('click','#options4',function(){
  document.getElementById('row').innerHTML='';
  fetch('/searchpage')
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
        '<button id="options3" type="button">Search</button>'+
      '</form>';
                            
                            
        if (element == null){
          document.getElementById('container').appendChild(newElement);
        } else {
          element.parentNode.removeChild(element);
        }
    });
    
    
});
$(document).on('click','#options3',function(){
  var list='';
  fetch('/searchpage')
  .then(response => response.json())
  .then(data => {
  var option = document.getElementById('options').value;
  var query ='';
  if (option=='genres'){
    query = document.getElementById('options2').value;
    fetch('https://api.themoviedb.org/3/discover/movie?with_genres='+ query +'&sort_by=popularity.desc&api_key=d43b2cf37b68ac54e47dbe77c0b7edb6')
       .then(response => response.json())
       .then(data => {
        document.getElementById('title').innerText= (document.getElementById('options2')).options[(document.getElementById('options2')).selectedIndex].text + ' - Click Pictures to Save to Profile';
        //+'</div>';
        document.getElementById('searchoptions').parentNode.removeChild(document.getElementById('searchoptions'));
        for (let i=0;i<6;i++){
          list += ('<div class="col-md-6 col-lg-4 mb-4">'+
              '<div class="feature-v1">'+
              '<div class="wrap-icon mb-3"><img src="https://image.tmdb.org/t/p/w300'+ data.results[i].poster_path+
              '"></div>'+
              '<h3 class="movietitle" id='+data.results[i].id +'>'+data.results[i].original_title+'</h3>'+
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
        document.getElementById('title').innerText=query + ' - Click Pictures to Save to Profile';
         for (let i=0;i<data.results[0].known_for.length;i++){
          list += ('<div class="col-md-6 col-lg-4 mb-4">'+
              '<div class="feature-v1">'+
              '<div class="wrap-icon mb-3"><img src="https://image.tmdb.org/t/p/w300'+ data.results[0].known_for[i].poster_path+
              '"></div>'+
              '<h3 class="movietitle" id='+data.results[0].known_for[i].id +'>'+data.results[0].known_for[i].original_title+'</h3>'+
              '<p class="movieinfo">'+data.results[0].known_for[i].overview+' </p>'+
              '</div>'+
              '</div>');
         }
         document.getElementById('row').innerHTML=list;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
   
  }
    
  });
});
function ProfilePage2(){
   var userMoviesID =[];
   var userID = sessionStorage.getItem('UserID');
  fetch('/logininfo')
  .then(response => response.json())
  .then(data => {
      let length = data.users[userID].storedMovies.length
      for (let i=0; i < length; i++){
          userMoviesID.push((data.users[userID].storedMovies[i]));
      } 
      ;
  });
  var html = userMovies(userMoviesID)
  return html;
 }
function userMovies(keys){
 
  let Uphotolist=[];
  let Uinfolist=[];
  let Utitlelist=[];
  var html='';
  document.getElementById('title').innerText='Your Saved Movies';
  for (let i=0;i<keys.length ;i++){
  
            fetch('https://api.themoviedb.org/3/movie/'+ keys[i] +'?api_key=d43b2cf37b68ac54e47dbe77c0b7edb6')
            .then(response => response.json())
            .then(data => {
                Utitlelist.push(data.original_title);
                Uinfolist.push(data.overview);
                Uphotolist.push("https://image.tmdb.org/t/p/w300" + data.poster_path);
                Uidlist.push(data.id);
                //console.log(Utitlelist);
               
                sessionStorage.setItem('usertitles', JSON.stringify(Utitlelist));
                sessionStorage.setItem('userphotos', JSON.stringify(Uphotolist));
                sessionStorage.setItem('userinfo', JSON.stringify(Uinfolist));

              //console.log(JSON.parse(sessionStorage.getItem("usertitles")));
            //console.log(document.getElementById("content2").innerHTML);
            //document.getElementById("row").innerHTML=list;
            })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  var storedtitles = JSON.parse(sessionStorage.getItem("usertitles"));
  var storedphotos = JSON.parse(sessionStorage.getItem("userphotos"));
  var storedinfo = JSON.parse(sessionStorage.getItem("userinfo"));
  
  for (let i = 0; i < storedtitles.length; i++){
    html += ('<div class="col-md-6 col-lg-4 mb-4">'+
    '<div class="feature-v1">'+
    '<div class="wrap-icon mb-3"><img src="'+storedphotos[i]+
    '"></div>'+
    '<h3 class="movietitle">'+storedtitles[i]+'</h3>'+
    '<p class="movieinfo">'+storedinfo[i]+' </p>'+
    '</div>'+
    '</div>');
  }
 return('<div class="row gutter-v3">'+ html + '</div>');
}
function RegisterPage(){
  var html =`<form method="POST" action="/logininfo" id="signup">
  <div id="searchform">
  <input id="firstName" name="firstName"  type="text" placeholder="First Name" required>
  <input id="lastName" name="lastName" type="text" placeholder="Last Name" required>
  <p>
  <input id="email" name="email"  type="text" placeholder="Enter Email" required>
  <input id="password" name="password" type="text" placeholder="Enter Password" required>
  </div>
  <div class="submit">
  <button id="register" type="submit">Register</button>
  <button type="reset">Reset</button>
  <div>
  </form>`
  return html;
}
$(document).on('click','#logout',function(){
  sessionStorage.removeItem('name');
});
function canSearch(){
$(document).on('click','#search',function(){
  return (sessionStorage.getItem('name'));
});
}

$(document).on('click','.feature-v1' ,function(){
      var title= this.querySelector(".movietitle")
      var id = title.id;
     var userID =  sessionStorage.getItem('UserID')
    console.log(id);
    //add();

    async function add(){
      const rawResponse = await fetch("/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body:(
          {userId: '0',
         storedMovies: '464052'
        })
      });
    
      const content = await rawResponse.json();
    
      console.log(content);
    
    };
  
});



