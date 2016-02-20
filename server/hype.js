function compute (matchList, watsonResult, callback) {
  try {
    var json = JSON.parse(JSON.stringify(watsonResult))
  } catch(e) {}

  if (json) {
    computeMetions(matchList, json.doc.mentions.mention)
    computeEntities(matchList, json.doc.entities.entity)
  }
  callback()

}

function computeMetions (matchList, mentions) {
  mentions.forEach(function (mention) {
    matchList.forEach(function (match) {
      if (match.name.toLowerCase() == mention.text.toLowerCase()) {
        match.score += parseFloat(mention.corefScore) + parseFloat(mention.score) + 0.01
      }
    })
  })
}

function computeEntities (matchList, entities) {
  entities.forEach(function (entity) {
    entity.mentref.forEach(function (mentref) {
      matchList.forEach(function (match) {
        if (match.name.toLowerCase() == mentref.text.toLowerCase()) {
          match.score += parseFloat(entity.score)
        }
      })
    })
  })
}

module.exports = {
  compute: compute
}
