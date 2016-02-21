function getMoviesList () {
  var moviesList = []
  moviesList.push({ name: 'Star Wars', score: 0.0,matches: 0})
  moviesList.push({ name: 'Zoolander 2', score: 0.0,matches: 0})
  moviesList.push({ name: 'Deadpool', score: 0.0,matches: 0})
  moviesList.push({ name: 'Dawn of Justice', score: 0.0,matches: 0})
  moviesList.push({ name: 'Civil War', score: 0.0,matches: 0})
  moviesList.push({ name: 'Apocalypse', score: 0.0,matches: 0})
  moviesList.push({ name: 'Jason Bourne', score: 0.0,matches: 0})
  moviesList.push({ name: 'Suicide Squad', score: 0.0,matches: 0})
  moviesList.push({ name: 'Gods of Egypt', score: 0.0,matches: 0})
  moviesList.push({ name: 'Kung Fu Panda 3', score: 0.0,matches: 0})
  return moviesList
}

function getRssfeeds () {
  var rssfeeds = [
    'https://movieweb.com/rss/movie-reviews/',
    'https://movieweb.com/rss/new-movies/',
    'https://movieweb.com/rss/all-news/',
    'https://movieweb.com/rss/movie-trailers/',
    'https://movieweb.com/rss/new-movies/',
    'https://movieweb.com/rss/tv-news/',
    'https://movieweb.com/rss/casting-news/',
    'https://movieweb.com/rss/dvd-bluray-news/',
    'https://movieweb.com/rss/celebrity-interviews/',
    'http://www.fandango.com/rss/top10boxoffice.rss',
    'http://www.fandango.com/rss/newmovies.rss',
    'http://feeds.feedburner.com/thr/film',
    'http://www.cinemablend.com/rss_preview.php',
    'http://www.cinemablend.com/rss_television.xml',
    'http://www.cinemablend.com/rss_review.php',
    'http://www.cinemablend.com/rss.php',
    'http://feeds2.feedburner.com/slashfilm',
    'http://feeds.feedburner.com/WeGotThisCoveredMovies',
    'http://www.movies.com/rss-feeds/movie-news-rss',
    'http://www.movies.com/rss-feeds/top-ten-box-office-rss',
    'http://www.movies.com/rss-feeds/dave-white-reviews-rss',
    'http://www.movies.com/rss-feeds/new-on-dvd-rss'
  ]
  return rssfeeds
}

module.export = {
    movies : getMoviesList,
    rssfeeds : getRssfeeds
}
