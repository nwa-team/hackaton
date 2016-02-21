var watsonCloud = require('watson-developer-cloud')

var relationship_extraction = watsonCloud.relationship_extraction({
  username: 'bd2d8923-1a69-4d59-a3a9-a56e374b99fa',
  password: 'M2KFNSlmQJJR',
  version: 'v1-beta'
})

function analyse (text, callback) {
  console.log('Calling watson...')
  relationship_extraction.extract({
    text: text,
  dataset: 'ie-en-news' },
    function (err, response) {
      if (err)
        console.log('Watson error : ' + err)
      else
        console.log('Watson replied...')
      callback(response)
    })
}

module.exports = {
  analyse: analyse
}
