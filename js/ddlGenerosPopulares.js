const api_key = '092359d9c97f9c3506f7647df0f40315';
const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=pt-br`;

fetch(url).then(function (response) {
  var contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json().then(function (json) {
      for (let i = 0; i <= json.genres.length; i++) {
        document.getElementById(
          'ddl-menu-destaque',
        ).innerHTML += `<option value=${json.genres[i].name} class="dropdown-item" id="ddl-menu-destaque-option" key=${json.genres[i].id}>${json.genres[i].name}</option>`;
      }
    });
  } else {
    console.log("Oops, we haven't got JSON!");
  }
});
