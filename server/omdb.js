"use strict";
var request = require('request');
var rp = require('request-promise');

var consts = require('./keys');

class Omdb {
    constructor() {
        this.host = 'http://www.omdbapi.com/';
        this.tmdbUri = 'http://api.themoviedb.org/3/';
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
                console.log(newMovies.length);
                
                return newMovies.map((mv) => this._nicefyMovie(mv));
            });
    }

    _nicefyMovie(movie) {
        return {
            name: movie.title,
            id: movie.id,
            posterUrl: movie.poster_path
        }
    }

}

module.exports = Omdb;