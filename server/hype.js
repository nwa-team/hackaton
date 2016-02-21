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
  if (mentions) {
    mentions.forEach(function (mention) {
      matchList.forEach(function (match) {
        if (matchToCompute(mention.text, match.name)) {
          match.matches += 1
          match.score += parseFloat(mention.corefScore) * parseFloat(mention.score)
        }
      })
    })
  }
}

function computeEntities (matchList, entities) {
  if (entities) {
    entities.forEach(function (entity) {
      entity.mentref.forEach(function (mentref) {
        matchList.forEach(function (match) {
          if (matchToCompute(mentref.text, match.name)) {
            match.matches += 1
            match.score += parseFloat(entity.score)
          }
        })
      })
    })
  }
}

function matchToCompute (text, value) {
  var result = false
  value.split(':').forEach(function (split) {
    if (text.toLowerCase().indexOf(split.toLowerCase()) > -1) {
      result = true
    }
  })
  return result
}

module.exports = {
  compute: compute
}
