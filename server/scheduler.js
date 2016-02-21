'use strict'

var Omdb = require('./omdb');
var omdb = new Omdb();

var db = require('./db')
var dataStore = new db();

var sleep = require('sleep');

class Scheduler {
    scheduleMoviesFetching() {
        
        // get movies 
        var mv = omdb.getNewMovies();
        mv.then((movies) => {
            dataStore.setMovies(movies);
        }).catch((err) => console.log(err));
        
        // wait a bit
        sleep.sleep(2);

        // update 
        omdb.updateMoviesWithTrailers();
    }
}

module.exports = Scheduler;