var path = require('path');
var express = require('express');

var app = express();

var watson = require('watson-developer-cloud');

var relationship_extraction = watson.relationship_extraction({
  username: 'username',
  password: 'password',
  version: 'v1-beta'
});

var staticPath = path.resolve(__dirname, '/public');
app.use(express.static(staticPath));

app.get('/', function (req, res) {
    
  relationship_extraction.extract({
    text: 'IBM Watson developer cloud',
    dataset: 'ie-en-news' },
    function (err, response) {
        if (err)
        console.log('error:', err);
        else
         res.send(JSON.stringify(response, null, 2));
    });
});

app.listen(3000, function() {
  console.log('listening');
});