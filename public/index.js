
// key for MOVIE API d43b2cf37b68ac54e47dbe77c0b7edb6 function for getting top 6 populat movies 
$.getJSON('https://api.themoviedb.org/3/discover/movie?api_key=d43b2cf37b68ac54e47dbe77c0b7edb6&query=sort_by=popularity.desc&language=en', function(data){
  
    var filmphoto = [];
    var movieinfo = [];
    var movietitle = [];
    var photolist = document.querySelectorAll(".wrap-icon");
    var infolist = document.querySelectorAll(".movieinfo");
    var titlelist = document.querySelectorAll(".movietitle");
    let PopularFilms = document.querySelectorAll(".feature-v1");
            for (let x=0; x < PopularFilms.length ; x++){
                filmphoto.push("https://image.tmdb.org/t/p/w300" + data.results[x].poster_path);
                movieinfo.push(data.results[x].overview);
                movietitle.push(data.results[x].original_title); 
            }    
            for (i = 0; i < PopularFilms.length; i++) {
                titlelist[i].innerHTML = movietitle[i];
                infolist[i].innerHTML = movieinfo[i];
                photolist[i].innerHTML = "<img src =" + filmphoto[i] + ">";
              } 
});
console.log($.getJSON('https://api.themoviedb.org/3/discover/movie?api_key=d43b2cf37b68ac54e47dbe77c0b7edb6&query=sort_by=popularity.desc&language=en'));
