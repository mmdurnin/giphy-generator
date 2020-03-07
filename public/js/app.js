const DICTIONARY_KEY = `199ad003`;
const GIPHY_KEY = `oTUtXHHGG0lFm07fgVMBSpUe0CwRZQlp`;
const GIPHY_ENDPOINT = `http://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&lang=en&limit=1&q=`;

let dictionary;


function getGiphy(word) {
  fetch(GIPHY_ENDPOINT.concat(word))
    .then(res => res.json())
    .then(json => {
      const img = document.createElement('img')
      img.src = json.data[0].images['fixed_height'].url
      img.id = 'giphy'
      document.getElementById('giphy-container').appendChild(img)
    })
}

$('button').click(function() {
  $('#giphy-container').empty();
  $.get('/generate')
    .done(function(response) {
      let randomWord = response.randWord;
      $('#random-word').text(randomWord);
      getGiphy(randomWord);
    })
    .fail(function(err) {
      console.log(err);
      $('#random-word').text("No giphys for this word!");
      getGiphy(accident);
    })
})