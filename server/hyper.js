var watson = require('./watson')
var async = require('async')
var rssextractor = require('./rssextractor')
var hype = require('./hype')

function hypeRssFeeds (rssfeeds, matchList, callback) {
  async.each(
    rssfeeds,
    function (rssfeed, finish) {
      analyzeRssfeed(rssfeed, matchList, finish)
    },
    function (err) {
      callback()
    }
  )
}

function analyzeRssfeed (rssfeed, matchList, callback) {
  rssextractor.getArticles(rssfeed, 1000, function (articles) {
    async.each(
      articles,
      function (article, done) {
        analyzeArticle(article, matchList, done)
      },
      function (err) {
        callback()
      }
    )

  })
}

function analyzeArticle (article, matchList, callback) {
  watson.analyse(article.title + article.softTitle + article.description + article.text, function (result) {
    hype.compute(matchList, result, callback)
  })
}

function hypeText (text, matchList, callback) {
  watson.analyse(text, function (result) {
    hype.compute(matchList, result, callback)
  })
}

module.exports = {
  hypeRssFeeds: hypeRssFeeds,
  hypeText: hypeText
}
