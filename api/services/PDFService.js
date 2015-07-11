var Promise = require('bluebird')
var extract = require('pdf-text-extract')
extract = Promise.promisify(extract)

module.exports = {
  extractContents: extractContents
}

function extractContents(filePath){
  sails.log.info("reading file", filePath, extract)
  // return the extracted contents from a file
  return extract(filePath)
}

