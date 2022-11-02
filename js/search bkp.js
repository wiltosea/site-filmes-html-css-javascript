const content = document.getElementById('searchBox').content;
console.log(content);

let termoBusca = window.location.search.split('=')[1];
console.log('termoBusca');
console.log(termoBusca);
console.log('termoBusca');
if (query_point != '') {
}

const api_key = '092359d9c97f9c3506f7647df0f40315';
const end_point = 'https://api.themoviedb.org/3';
const url = ``;
// https://api.themoviedb.org/3/search/movie?api_key=092359d9c97f9c3506f7647df0f40315&query=vazio&language=pt-BR

document
  .getElementById('searchButton')
  .addEventListener('click', function (event) {
    event.preventDefault();

    query_point = document.getElementById('searchBox').value;
    document.getElementById('search-results').innerHTML = '';

    fetch(
      `${end_point}/search/movie?api_key=${api_key}&query=${query_point}&language=pt-BR`,
    ).then(function (response) {
      var contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json().then(function (json) {
          for (let i = 0; i <= json.results.length; i++) {
            let imagem = '';
            let start_url_image = `<img src='https://image.tmdb.org/t/p/original`;
            let end_url_image = `class='card-img-top' alt='...'>`;
            json.results[i].poster_path == null
              ? (imagem =
                  "<img src='images/imageNull.jpg' class='card-img-top' alt='...'>")
              : (imagem =
                  start_url_image +
                  json.results[i].poster_path +
                  "'" +
                  end_url_image);
            document.getElementById('search-results').innerHTML += `
            <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
              <div class="card mb-5 border-0" >
              ${imagem} 
                <div class="card-body">
                  <h5 class="card-title">${json.results[i].title}</h5>
                  <p class="card-text">${json.results[i].overview}</a>
                </div>
              </div>
            </div>
          `;
          }
        });
      } else {
        console.log("Oops, we haven't got JSON!");
      }
    });
    document.getElementById('searchBox').value = '';
  });
