var watsonCloud = require('watson-developer-cloud')

var relationship_extraction = watsonCloud.relationship_extraction({
  username: '****',
  password: '****',
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
