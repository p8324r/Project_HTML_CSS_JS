const search_res = document.getElementById('search_res');
const all_team = document.getElementById('all_team');
const core = document.getElementById('core');
const devs = document.getElementById('devs');
const designs = document.getElementById('designs');
const mentors = document.getElementById('mentors');


search_res.addEventListener('click',() => {
    search_res.style.backgroundColor = 'white';
    all_team.style.backgroundColor = 'inherit';
    core.style.backgroundColor = 'inherit';
    devs.style.backgroundColor = 'inherit';
    designs.style.backgroundColor = 'inherit';
    mentors.style.backgroundColor = 'inherit';
    location.reload();
})

all_team.addEventListener('click',() => {
    all_team.style.backgroundColor = 'white';
    search_res.style.backgroundColor = 'inherit';
    core.style.backgroundColor = 'inherit';
    devs.style.backgroundColor = 'inherit';
    designs.style.backgroundColor = 'inherit';
    mentors.style.backgroundColor = 'inherit';
})

core.addEventListener('click',() => {
    core.style.backgroundColor = 'white';
    all_team.style.backgroundColor = 'inherit';
    search_res.style.backgroundColor = 'inherit';
    devs.style.backgroundColor = 'inherit';
    designs.style.backgroundColor = 'inherit';
    mentors.style.backgroundColor = 'inherit';
})

devs.addEventListener('click',() => {
    devs.style.backgroundColor = 'white';
    all_team.style.backgroundColor = 'inherit';
    core.style.backgroundColor = 'inherit';
    search_res.style.backgroundColor = 'inherit';
    designs.style.backgroundColor = 'inherit';
    mentors.style.backgroundColor = 'inherit';
})

designs.addEventListener('click',() => {
    designs.style.backgroundColor = 'white';
    all_team.style.backgroundColor = 'inherit';
    core.style.backgroundColor = 'inherit';
    devs.style.backgroundColor = 'inherit';
    search_res.style.backgroundColor = 'inherit';
    mentors.style.backgroundColor = 'inherit';
})

mentors.addEventListener('click',() => {
    mentors.style.backgroundColor = 'white';
    all_team.style.backgroundColor = 'inherit';
    core.style.backgroundColor = 'inherit';
    devs.style.backgroundColor = 'inherit';
    designs.style.backgroundColor = 'inherit';
    search_res.style.backgroundColor = 'inherit';
})
// !DRY.

const API_KEY = 'api_key=613e09eb78d25b5e829d88deb17dda78';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const search_URL = BASE_URL + '/search/movie?';
const genre_table_URL = 'https://api.themoviedb.org/3/genre/movie/list?'+API_KEY+'&language=en-US';




fetch(genre_table_URL).then(res => res.json()).then(data => {store_genre(data);});
fetch(API_URL).then(res => res.json()).then(data => {display_on_page(data);});

var fetched_genre_ids = [],fetched_genre_names = [];
function store_genre(data){
    data.genres.forEach((e) => {
        fetched_genre_ids.push(e['id']);
        fetched_genre_names.push(e['name']);
    } );
}

function get_genre(genre_id){
   for(let i = 0,l=fetched_genre_ids.length;i<l;++i){
        if(fetched_genre_ids[i] == genre_id)
        {
            return fetched_genre_names[i];
        }
   }
}


const main_movie_list = document.querySelector('.movie_list');

function display_on_page(data){
    data.results.forEach((element,index) => {
        let obj = element.genre_ids;
        let html_template = `<div class="grid-item grid-item${index+1}" style="background-image:url(${IMG_URL + element.poster_path});"> <span>${element.original_title}, ${get_genre(obj[0])} </span> 
        <span class="hoverspan"> Watch Now > </span>
        <img src="${IMG_URL + element.poster_path}"></div>`;
        main_movie_list.innerHTML += html_template;
    });
}

const submitBtn = document.getElementById('mainSubBtn');

submitBtn.addEventListener('click',()=>{
    const val = document.querySelector('input.search_bar').value;
    var queryTempl = search_URL+`query=${val.replace(/ /g,'+')}&`+API_KEY;
    console.log(queryTempl);
    fetch(queryTempl).then(res=>res.json()).then(data=>{remove_from_page(); display_on_page(data)});
})


function remove_from_page(){
    main_movie_list.innerHTML = '';
}


const hitEntr = document.querySelector('input.search_bar');

hitEntr.addEventListener("keyup",e=>{
    e.preventDefault();
    if(e.keyCode === 13){
        var queryTempl = search_URL+`query=${hitEntr.value.replace(/ /g,'+')}&`+API_KEY;
        fetch(queryTempl).then(res=>res.json()).then(data=>{remove_from_page(); display_on_page(data)});
    }
})