var path = require('path')
var express = require('express')

var app = express()

var staticPath = path.resolve(__dirname, '/public')
app.use(express.static(staticPath))

var Watson = require('./watson')

var Scheduler = require('./scheduler');
var updater = new Scheduler();

var CronJob = require('node-cron');
CronJob.schedule('00 30 11 * * 1-7', updater.scheduleMoviesFetching());
CronJob.schedule('00 00 4 * * *', updater.scheduleHypeUpdate());

var Omdb = require('./omdb');
var omdb = new Omdb();

var Db = require('./db')
var dataStore = new Db();

// Pass q parameter in the query for the movie name
app.get('/getMovie', function (req, res) {
    omdb.getMovie((movieInfo) => res.send(movieInfo), req.query.q);
});

app.get('/getMovies', (req, res) => {
    dataStore.getMovies((docs) => { 
        res.send(docs);
    });
});

app.listen(3000, function () {
    console.log('listening')
});

/* Actions should be executed by the cron scheduler
app.get('/updateMovies', (req, res) => {
   omdb.updateMoviesWithTrailers();
   res.send('ok'); 
});

app.get('/setMovies', (req, res) => {
    var mv = omdb.getNewMovies();
    mv.then((movies) => {
        dataStore.setMovies(movies);
        res.send('Ok');
    }).catch((err) => res.send(err));
});
*/
