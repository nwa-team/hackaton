var path = require('path')
var express = require('express')

var app = express()

var staticPath = path.resolve(__dirname, '/public')
app.use(express.static(staticPath))

// Schedule update jobs
var Scheduler = require('./scheduler');
var updater = new Scheduler();

var runScheduledActionsOnStart = false;

var CronJob = require('cron').CronJob;
var moviesUpdate = new CronJob({
    cronTime: '00 30 11 * * 1-7',
    onTick: updater.scheduleMoviesFetching,
    start: true,
    runOnInit: runScheduledActionsOnStart
});
var hypeUpdate = new CronJob({
    cronTime: '00 00 4 * * *',
    onTick: updater.scheduleHypeUpdate,
    start: true,
    runOnInit: runScheduledActionsOnStart
});

var Omdb = require('./omdb');
var omdb = new Omdb();

var Db = require('./db')
var dataStore = new Db();

// Pass q parameter in the query for the movie name
// Returns detailed information about specific movie
app.get('/getMovie', (req, res) => 
    omdb.getMovie((movieInfo) => res.send(movieInfo), req.query.q));

// Returns the list of movies, with basic information
app.get('/getMovies', (req, res) => 
    dataStore.getMovies((docs) => res.send(docs))
);

app.get('/', (req, res) => {
    res.send('Make everything ok!');
})

// Start server
app.listen(3000, function () {
    console.log('listening')
});
