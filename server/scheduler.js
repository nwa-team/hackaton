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

var rssfeeds = [
  'https://movieweb.com/rss/movie-reviews/',
  'https://movieweb.com/rss/new-movies/',
  'https://movieweb.com/rss/all-news/',
  'https://movieweb.com/rss/movie-trailers/',
  'https://movieweb.com/rss/new-movies/',
  'https://movieweb.com/rss/tv-news/',
  'https://movieweb.com/rss/casting-news/',
  'https://movieweb.com/rss/dvd-bluray-news/',
  'https://movieweb.com/rss/celebrity-interviews/',
  'http://www.fandango.com/rss/top10boxoffice.rss',
  'http://www.fandango.com/rss/newmovies.rss',
  'http://feeds.feedburner.com/thr/film',
  'http://www.cinemablend.com/rss_preview.php',
  'http://www.cinemablend.com/rss_television.xml',
  'http://www.cinemablend.com/rss_review.php',
  'http://www.cinemablend.com/rss.php',
  'http://feeds2.feedburner.com/slashfilm',
  'http://feeds.feedburner.com/WeGotThisCoveredMovies',
  'http://www.movies.com/rss-feeds/movie-news-rss',
  'http://www.movies.com/rss-feeds/top-ten-box-office-rss',
  'http://www.movies.com/rss-feeds/dave-white-reviews-rss',
  'http://www.movies.com/rss-feeds/new-on-dvd-rss'
]


var hyper = require('./hyper')

// Use watson api to compute movie hype
// Gets a list of movies and a callback
function computeHype(moviesList, callback) {
    console.log('computing hype');
    hyper.hypeRssFeeds(rssfeeds,moviesList,function(){
        hyper.hypeTwitter(moviesList,function(){
            callback(moviesList)
            console.log('done computing hype');
        })
    })
}

module.exports = Scheduler;