const api_key = '092359d9c97f9c3506f7647df0f40315';
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=pt-BR&page=1`;
fetch(url).then(function (response) {
  var contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json().then(function (json) {
      for (let i = 0; i <= json.results.length; i++) {
        document.getElementById(
          'data-from-movie',
        ).innerHTML += `<span>${json.results[i].title}</span>`;
      }
    });
  } else {
    console.log("Oops, we haven't got JSON!");
  }
});
