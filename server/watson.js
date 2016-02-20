"use strict";
class Watson {
  constructor() {
    this.watsonCloud = require('watson-developer-cloud')

    this.relationship_extraction = this.watsonCloud.relationship_extraction({
      username: 'username',
      password: 'password',
      version: 'v1-beta'
    })
  }

  extractRelationship(text, resultCallback) {
    this.relationship_extraction.extract({
      text: text,
    dataset: 'ie-en-news' },
      function (err, response) {
        if (err)
          resultCallback(err)
        else
          resultCallback(JSON.stringify(response, null, 2))
      })
  }
}

module.exports = Watson;