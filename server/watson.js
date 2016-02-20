var watson = require('watson-developer-cloud');

var relationship_extraction = watson.relationship_extraction({
  username: 'username',
  password: 'password',
  version: 'v1-beta'
});
  
function sendToWaston(text,resultCallback) {
    relationship_extraction.extract({
        text: text,
        dataset: 'ie-en-news' },
        function (err, response) {
            if (err)
            console.log('error:', err);
            else
            resultCallback(JSON.stringify(response, null, 2));
    });    
}  
