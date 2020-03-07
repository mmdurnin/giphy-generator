const express = require("express");
const app = express();
app.use(express.static("public"));

app.use("css", express.static(__dirname + '/public/stylesheets'));
app.use("js", express.static(__dirname + '/public/javascripts'));
app.use("dictionary", express.static(__dirname + '/public/dictionary.txt'));


const fs = require('fs');


app.get("/", function(req, res) {
  res.redirect("index.html");
});

app.get('/generate', (req, res) => {
  let dictionaryPromise = new Promise((resolve, reject) => {
    fs.readFile((__dirname + '/public/dictionary.txt'), (err, data) => {
      if (err) {
        console.log(err)
        reject(new Error("Unable to read the dictionary"))
      } else {
        resolve(data)
      }
    })
  })
  dictionaryPromise
    .then((data) => {
      let dictionary = data.toString().split("\n");
      let randIdx = Math.floor(Math.random() * dictionary.length - 1)
      let randWord = dictionary[randIdx]
      res.send({randWord: randWord})
    })
    .catch((err) => console.log(err))
})

const server = app.listen((8081, function() {
  const port = server.address().port;
  console.log(`Server started at ${port}`);
}));