let movieId = window.location.hash.split('=')[1];
// movieId = '436270';
const api_key = '092359d9c97f9c3506f7647df0f40315';
const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=pt-BR`;

// Função para retornar a imagem de fundo
function imageBackDrop(image) {
  let start_url_image = `<img class="card-img-top" alt='...' src='https://image.tmdb.org/t/p/original`;
  let end_url_image = `' />`;
  return start_url_image + image + end_url_image;
}

function imageProducer(image) {
  let start_url_image = `<img class="col-4" alt='...' src='https://image.tmdb.org/t/p/original`;
  let end_url_image = `' />`;
  return start_url_image + image + end_url_image;
}

function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
}

fetch(url).then(function (response) {
  var contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json().then(function (json) {
      let ano = json.release_date;
      ano = ano.split('-');
      ano = ano[0];
      let hour = toHoursAndMinutes(json.runtime);
      document.getElementById('data-title').innerHTML += json.title;
      document.getElementById(
        'original-title',
      ).innerHTML += `${json.original_title}`;
      document.getElementById('release_year').innerHTML += ano;
      document.getElementById('popularity').innerHTML += Math.round(
        json.popularity,
      );
      document.getElementById('vote_average').innerHTML += Math.round(
        json.vote_average,
      );
      document.getElementById(
        'runtime',
      ).innerHTML += `${hour.hours}hs ${hour.minutes}min`;
      document.getElementById('imageBackDrop').innerHTML += imageBackDrop(
        json.poster_path,
      );
      document.getElementById('overview').innerHTML += json.overview;
      json.production_companies.map(
        (item) =>
          (document.getElementById('production_companies').innerHTML +=
            item.logo_path != null
              ? `<li class="border-0 list-group-item">${imageProducer(
                  item.logo_path,
                )}</li>`
              : `<li class="list-group-item border-0">${item.name}</li>`),
      );
    });
  } else {
    console.log("Oops, we haven't got JSON!");
  }
});
