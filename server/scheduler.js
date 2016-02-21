'use strict'

var Omdb = require('./omdb');
var omdb = new Omdb();

var Db = require('./db')
var dataStore = new Db();

class Scheduler {
    scheduleMoviesFetching() {
        console.log('fetching list of movies...');
        dataStore.deleteAll();
        // Get movies 
        var mv = omdb.getNewMovies();
        mv.then((movies) => {
            dataStore.setMovies(movies);
        }).catch((err) => console.log(err));
        
        // Wait a bit and update trailers
        setTimeout(omdb.updateMoviesWithTrailers, 2000);
        
        // New movies, so we need to hype values
        setTimeout(this.scheduleHypeUpdate, 120000);
    }

    scheduleHypeUpdate() {
        console.log('compute hype values...');
        dataStore.getMovies((mv) => {
            
            var hypeInput = mv.map((m) => { return {
                name: m.name,
                id: m._id,
                score: 0,
                matches: 0 }});
            
            computeHype(hypeInput, (hypeMovies) => 
                hypeMovies.forEach((i) => {
                   dataStore.update(i.id, { hype: i.score });
                }));
        });
    }
}

// Use watson api to compute movie hype
// Gets a list of movies and a callback
function computeHype(moviesList, callback) {
    
}

module.exports = Scheduler;