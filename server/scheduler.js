'use strict'

var Omdb = require('./omdb');
var omdb = new Omdb();

var Db = require('./db')
var dataStore = new Db();

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
    
    scheduleHypeUpdate() {
         dataStore.getMovies((mv) => {
           mv.forEach((i) => {
              this.computeHype(i.name)
                  .then((t) => dataStore.update(i._id, { hype: t}));
           });
        });
    }
    
    // Use watson api to compute movie hype
    // Returns a promise
    computeHype(movieName) {
        Promise.resolve(Math.round(Math.random() * 10) + 1);
    }
}

module.exports = Scheduler;