"use strict";
var request = require('request')
class Omdb {
	constructor(){
    	this.host = 'http://www.omdbapi.com/';
	}

	getMovie(resultCallback, title, type, year, plot, tomatoes) {
		var url = this.host + '?t=' + title + '&?type=' + type + '&?y=' + year + '&?plot=' + plot + '&?r=json' + '&?tomatoes=' + tomatoes;
		request(url, function(error, response, body) {
			if(!error && response.statusCode == 200) {
				console.log(body);
				resultCallback(body);
			}
			resultCallback(error)
		});
	}
	
}

module.exports = Omdb;