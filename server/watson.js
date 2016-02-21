var watsonCloud = require('watson-developer-cloud')

var consts = require('./keys');

var relationship_extraction = watsonCloud.relationship_extraction(consts.WatsonKey)

function analyse (text, callback) {
  relationship_extraction.extract({
    text: text,
  dataset: 'ie-en-news' },
    function (err, response) {
      if (err){
        console.log('Watson error : ' + err)
        callback(null)
      }
      else
      callback(response)
    })
}

module.exports = {
  analyse: analyse
}
