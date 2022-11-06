const content = document.getElementById('searchBox').content;
console.log(content);

let termoBusca = window.location.search.split('=')[1];

const api_key = '092359d9c97f9c3506f7647df0f40315';
const end_point = 'https://api.themoviedb.org/3';
const url = ``;

search(termoBusca);
termoBusca = '';

function ano(data) {
  let ano = data;
  ano = ano.split('-');
  ano = ano[0];
  return ano;
}

function imageBackDrop(image) {
  let start_url_image = `<img class="card-img-top" alt='...' src='https://image.tmdb.org/t/p/original`;
  let end_url_image = `' />`;
  return start_url_image + image + end_url_image;
}

function search(termo) {
  fetch(
    `${end_point}/search/movie?api_key=${api_key}&query=${termo}&language=pt-BR`
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
          <div class="col-12 col-sm-6 col-lg-3 my-2">
            <div class="card border-0">
              ${imagem}
              <span class="vote_average">${json.results[i].vote_average}</span>
              <div class="card-body">
                <h4 class="card-title overview">${json.results[i].title}</h4>
                <div class="d-flex justify-content-between text-truncate-container">
                  <p class="card-text text-truncate-personal">${
                    json.results[i].overview
                  }</p>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-between align-items-center">
                <span class="">Ano: ${ano(json.results[i].release_date)}</span>
                <a href="detalhes.html?id=${
                  json.results[i].id
                }&fromSearch=true">
                  <button class="btn btn-warning">Ver Mais</button>
                </a>
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
}

document
  .getElementById('searchButton')
  .addEventListener('click', function (event) {
    event.preventDefault();
    termo = document.getElementById('searchBox').value;
    document.getElementById('search-results').innerHTML = '';
    document.getElementById('searchBox').value = '';
    search(termo);
  });
