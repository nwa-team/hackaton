"use strict";
var request = require('request');
var rp = require('request-promise');

var db = require('./db');
var dataStore = new db();

var sleep = require('sleep');

var consts = require('./keys');

class Omdb {
    constructor() {
        this.host = 'http://www.omdbapi.com/';
        this.tmdbUri = 'http://api.themoviedb.org/3/';
        this.youtubeApi = 'https://www.googleapis.com/youtube/v3/search';
        this.apiKey = consts.ApiKey;
    }

    getMovie(resultCallback, title, type, year, plot, tomatoes) {
        var url = this.host + '?t=' + title + '&?type=' + type + '&?y=' + year + '&?plot=' + plot + '&?r=json' + '&?tomatoes=' + tomatoes;
        request(url, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body);
                resultCallback(body);
            } else {
                resultCallback(error)
            }
        });
    }

    _getNowPlaying() {
        let url = `${this.tmdbUri}movie/now_playing?api_key=${this.apiKey}`;
        return rp({
            uri: url,
            json: true
        });
    }

    _getUpcoming() {
        let url = `${this.tmdbUri}movie/upcoming?api_key=${this.apiKey}`;
        return rp({
            uri: url,
            json: true
        });
    }

    getNewMovies() {
        var newMovies;
        return this._getNowPlaying()
            .then((body) => {
                newMovies = body.results;
                return this._getUpcoming();
            })
            .then((body) => {
                newMovies = newMovies.concat(body.results);
                newMovies = newMovies.map((mv) => this._nicefyMovie(mv));
                
                return newMovies;
            });
    }

    _nicefyMovie(movie) {
        return {
            name: movie.title,
            id: movie.id,
            posterUrl: movie.poster_path,
            date: movie.release_date,
            trailerId: ''
        }
    }
    
    updateMoviesWithTrailers() {
        dataStore.getMovies((mv) => {
           mv.forEach((i) => {
              sleep.sleep(2);
              console.log(i._id);
              
              this.getTrailer(i.name)
                  .then((t) => dataStore.update(i._id, { trailerId: t}));
           });
        });
    }
    
    getTrailer(movieName) {
        let searchQuery = movieName + ' trailer';
        let url = `${this.youtubeApi}?part=snippet&q=${searchQuery}&key=${consts.YoutubeApiKey}`;
        return rp({
            uri: url,
            json: true
        }).then((inf) => inf.items[0].id.videoId);
    }
}

module.exports = Omdb;