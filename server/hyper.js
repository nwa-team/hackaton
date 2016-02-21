var watson = require('./watson')
var async = require('async')
var webextractor = require('./webextractor')
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
  webextractor.getRssArticles(rssfeed, 100, function (articles) {
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
  watson.analyse(article.title + ' ' + article.softTitle + ' ' + article.description + ' ' + article.text, function (result) {
    hype.compute(matchList, result, callback)
  })
}

function hypeText (text, matchList, callback) {
  watson.analyse(text, function (result) {
    hype.compute(matchList, result, callback)
  })
}

function hypeLinks (links, matchList, callback) {
  async.each(
    links,
    function (link, done) {
      webextractor.scrapeUrl(link, function (html) {
        watson.analyse(html , function (result) {
          hype.compute(matchList, result , done)
        })
      }),
      function (err) {
        callback()
      }
    }
  )
}

module.exports = {
  hypeRssFeeds: hypeRssFeeds,
  hypeText: hypeText,
  hypeLinks: hypeLinks
}
