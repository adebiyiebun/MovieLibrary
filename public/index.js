window.onload = function(){
  //CREATING ROUTER
  var active = Array.from(document.querySelectorAll("[data-link]"));
  function navigate(event){
    
    var route = event.target.attribute[0].value;
    var info = firstrouter.routes.filter(function(r) {
      console.log(r);
      return r.path === route;
    })[0];
    if (!info){
      window.history.pushState({},'name','404');
      document.getElementById('title').innerHTML= '404: Page not Found';
    } else {
      window.history.pushState({},'name',info.path);
      view.innerHTML = 'youve clicked' + info.name;
    }
  };
  active.forEach(function(route){
    console.log(route);
    route.addEventListener('click', navigate, false);
  });
 
  var router = function(name,routes){
    return {
      name:name,
      routes:routes
    }
  };
  var view = document.getElementById('content2');
  var firstrouter = new router('firstrouter',[
    {
      path:'/',
      name: 'Home'
    },
    {
      path:'/login',
      name: 'Login'
    },
    { 
      path:'/register',
      name: 'Register'
    }
  ]);
  var curPath = location.pathname;
  if (curPath==='/'){
    view.innerHTML='Home Page'
  }else{
    var exists = firstrouter.routes.filter(function(r){
      return r.path ===curPath
    })[0];
    if(exists){
      view.innerHTML="you are on the " + exists.name;
    } else{
      document.getElementById('title').innerHTML= '404: Page not Found';
    }
    
  }
}
 