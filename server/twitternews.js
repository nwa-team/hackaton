var Twitter = require('twitter')
var consts = require('./keys');
var client = new Twitter(consts.TwitterKey)


function getTweets(matchName,callback) {
  var params = {q: matchName.toLowerCase()}
  var result = '';
  client.get('search/tweets', params, function (error, tweets, response) {
    if (!error) {
        var json = JSON.parse(JSON.stringify(tweets))
        json.statuses.forEach(function(tweet){
            result += ' ' + tweet.text
        })
    }
    callback(result)
  })
}

module.exports = {
    getTweets  : getTweets 
}
