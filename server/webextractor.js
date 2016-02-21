var request = require('request')
var feed = require('feed-read')
var extractor = require('unfluff')
var async = require('async')

function getRssArticles (rssfeed, numberOfArticles, callback) {
   console.log('feed from '+ rssfeed)
  var result = []
  feed(rssfeed, function (err, articles) {
    articles = articles.slice(0, numberOfArticles)
    async.each(
      articles,
      function (article, done) {
        getArticle(article.link, function (info) {
          result.push(info)
          done()
        })
      },
      function (err) {
        callback(result)
      }
    )
  })
}

function getArticle (url, callback) {
  var info = {}
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      info = extractor(body)
      info.link = url
    }
    callback(info)
  })
}

function scrapeUrl (url, callback) {
    
  request(url, function (error, response, html) {
    if (!error) {
        
      callback(html)
    }
    else{
        console.log(error)
    }
  })
}

module.exports = {
  getRssArticles: getRssArticles,
  scrapeUrl: scrapeUrl
}
