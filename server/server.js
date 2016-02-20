var path = require('path')
var express = require('express')

var app = express()

var staticPath = path.resolve(__dirname, '/public')
app.use(express.static(staticPath))

var Watson = require('./watson')
var watson = new Watson();
app.get('/testWatson', function (req, res) {
    var callback = function (text) {
        res.send(text)
    }

    watson.extractRelationship('Cloud Foundry provides your credentials in JSON format.', callback)
});

var Omdb = require('./omdb');
var omdb = new Omdb();

app.get('/getMovie', function (req, res) {
    var callback = function (text) {
        res.send(text)
    }
    omdb.getMovie(callback, 'Matrix');
});

var db = require('./db')
var dataStore = new db();

app.get('/getMovies', (req, res) => {
    dataStore.getMovies((docs) => { 
        res.send(docs);
    });
});

app.get('/setMovies', (req, res) => {
    var mv = omdb.getNewMovies()
    mv.then((movies) => {
        dataStore.setMovies(movies)
        res.send("Ok");
    }).catch((err) => res.send(err));
    
});

app.listen(3000, function () {
    console.log('listening')
});
