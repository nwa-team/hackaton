var watson = require('./watson')
var async = require('async')
var webextractor = require('./webextractor')
var hype = require('./hype')
var twitter = require('./twitternews')

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
  var articleText = ''
  webextractor.getRssArticles(rssfeed, 10, function (articles) {
    articles.forEach(function (article) {
      articleText += article.title + ' ' + article.softTitle + ' ' + article.description + ' ' + article.text
    })
    analyzeArticle(articleText, matchList, callback)
  })
}

function analyzeArticle (article, matchList, callback) {
  watson.analyse(article, function (result) {
    hype.compute(matchList, result, callback)
  })
}

function hypeText (text, matchList, callback) {
  watson.analyse(text, function (result) {
    hype.compute(matchList, result, callback)
  })
}

function hypeTwitter (matchList, callback) {
  async.each(
    matchList,
    function (match, finish) {
      twitter.getTweets(match.name, function (tweets) {
        watson.analyse(tweets, function (result) {
          hype.compute(matchList, result, finish)
        })
      })
    },
    function (err) {
      callback()
    }
  )
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
  hypeLinks: hypeLinks,
  hypeTwitter: hypeTwitter
}
