var path = require('path');
var express = require('express');

var app = express();

var staticPath = path.resolve(__dirname, '/public');
app.use(express.static(staticPath));

app.get('/', function (req, res) {
  res.send('Movies Hype Generator!');
});

app.listen(3000, function() {
  console.log('listening');
});