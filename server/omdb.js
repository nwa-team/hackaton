"use strict";
var request = require('request');
var rp = require('request-promise');
class Omdb {
    constructor() {
        this.host = 'http://www.omdbapi.com/';
        this.tmdbUri = 'http://api.themoviedb.org/3/';
        this.apiKey = `#APIKEY`;
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

    getNowPlaying() {
        let url = `${this.tmdbUri}movie/now_playing?api_key=${this.apiKey}`;
        return rp({
            uri: url,
            json: true
        });
    }

    getUpcoming() {
        let url = `${this.tmdbUri}movie/upcoming?api_key=${this.apiKey}`;
        return rp({
            uri: url,
            json: true
        });
    }

    getNewMovies() {
        var newMovies;
        return this.getNowPlaying()
            .then((body) => {
                newMovies = body.results;
                return this.getUpcoming();
            })
            .then((body) => {
                newMovies = newMovies.concat(body.results);
                console.log(newMovies.length);
                
                return newMovies;
            });
    }

}

module.exports = Omdb;