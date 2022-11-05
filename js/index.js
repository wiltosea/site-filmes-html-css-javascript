const api_key = '092359d9c97f9c3506f7647df0f40315';
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=pt-BR&page=`;
let currentPage = 1;

fetch(
  `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=pt-br`
).then(function (response) {
  let contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json().then(function (json) {
      for (let i = 0; i <= json.genres.length; i++) {
        if (json?.genres?.[i]?.name) {
          document.getElementById(
            'ddl-menu-destaque'
          ).innerHTML += `<option value=${json.genres[i].name} class="dropdown-item" id="ddl-menu-destaque-option" key=${json.genres[i].id}>${json.genres[i].name}</option>`;
        }
      }
    });
  } else {
    console.log("Oops, we haven't got JSON!");
  }
});

fetch(url + currentPage).then(function (response) {
  let contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json().then(function (json) {
      for (let i = 0; i <= json.results.length; i++) {
        if (json?.results?.[i]?.title) {
          document.getElementById(
            'data-from-movie'
          ).innerHTML += `<span>${json.results[i].title}</span>`;
        }
      }
    });
  } else {
    console.log("Oops, we haven't got JSON!");
  }
});

// START OF IMAGENS EM DESTAQUE

// https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=pt-BR&page=1

let qtdFilmes = 4;
const loadMore = () => {
  document
    .getElementById('btn_carregarMaisFilmes')
    .addEventListener('click', () => {
      // console.log('teste');
      qtdFilmes = qtdFilmes + 4;

      // Lógica para pegar mais de 20 filmes
      if (qtdFilmes % 20 === 4) {
        currentPage++;
        qtdFilmes = 4;
      }

      // document.getElementById(placeId).innerHTML = '';
      return getImagesFromFilms(url + currentPage, qtdFilmes);
    });
};

loadMore();

// DropDownList - Menu de destaque
const ddlMenuDestaque = () => {
  const genre = document.getElementById('ddl-menu-destaque');
  genre.addEventListener('change', () => {
    const option = document.getElementById('ddl-menu-destaque-option');
    console.log(option);
  });
};

ddlMenuDestaque();

// end of DropDownList - Menu de destaque

// Função para retornar a imagem de fundo
function imageBackDrop(image) {
  let start_url_image = `<img class="card-img-top" alt='...' src='https://image.tmdb.org/t/p/original`;
  let end_url_image = `' />`;
  return start_url_image + image + end_url_image;
}

//função para montar o node html do card de imagens de destaque
function getImagesFromFilms(url, qtdFilmes) {
  const placeId = 'em-destaque';
  // debugger;
  fetch(url).then(function (response) {
    let contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      return response.json().then(function (json) {
        for (let i = qtdFilmes - 4; i < qtdFilmes; i++) {
          // let imagem = '';
          let ano = json.results[i].release_date;
          ano = ano.split('-');
          ano = ano[0];
          console.log(ano);
          json.results[i].backdrop_path == null
            ? (imagem =
                "<img src='images/imageNull.jpg' class='card-img-top' alt='...'>")
            : (imagem = imageBackDrop(json.results[i].poster_path));
          document.getElementById(placeId).innerHTML += `
          <div class="col-12 col-sm-6 col-lg-3 my-2">
            <div class="card border-0">
              ${imagem}
              <span class="vote_average">${json.results[i].vote_average}</span>
              <div class="card-body">
                <h4 class="card-title overview">${json.results[i].title}</h4>
                <div class="d-flex justify-content-between text-truncate-container">
                  <p class="card-text text-truncate-personal">${json.results[i].overview}</p>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-between align-items-center">
                <span class="">Ano: ${ano}</span>
                <a href="detalhes.html#id=${json.results[i].id}">
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

getImagesFromFilms(url + currentPage, qtdFilmes);
