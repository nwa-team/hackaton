var path = require('path')
var express = require('express')

var app = express()

var staticPath = path.resolve(__dirname, '/public')
app.use(express.static(staticPath))

var rssfeeds = [
  'http://feeds.abcnews.com/abcnews/internationalheadlines',
  'http://rss.cbc.ca/lineup/world.xml',
  'http://rss.cnn.com/rss/cnn_world.rss',
  'http://feeds.skynews.com/feeds/rss/world.xml',
  'http://newsrss.bbc.co.uk/rss/newsonline_world_edition/front_page/rss.xml',
  'http://feeds.reuters.com/Reuters/worldNews'
]

var moviesList = []


var hyper = require('./hyper')

moviesList.push({ name : 'Obama', score : 0.0});
moviesList.push({ name : 'Deadpool', score : 0.0});
moviesList.push({ name : 'USA', score : 0.0});
moviesList.push({ name : 'Putin', score : 0.0});
moviesList.push({ name : 'Country', score : 0.0});

app.get('/', function (req, res) {
    hyper.hypeRssFeeds(rssfeeds,moviesList,function(text){
        res.send(moviesList);
    })
})

app.listen(3000, function () {
  console.log('listening')
})
