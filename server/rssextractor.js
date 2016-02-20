var request = require('request')
var feed = require('feed-read')
var extractor = require('unfluff')
var async = require('async')

function getArticles(rssfeed,numberOfArticles, callback) {
    
  var result = []
  feed(rssfeed, function (err, articles) {
    articles = articles.slice(0,numberOfArticles)
    async.each(
      articles,
      function (article, done) {
        _getArticle(article.link, function (info) {
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

function _getArticle (url,  callback) {
  var info = {}
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      info = extractor(body)
      info.link = url
    }
     callback(info)
  })
}

module.exports = {
  getArticles: getArticles
}
