var Promise = require('bluebird')
var extract = require('pdf-text-extract')
extract = Promise.promisify(extract)

module.exports = {
	extractContents: extractContents
}

function extractContents(filePath){
	// fetch the contents from file
	// return the extracted contents
	// var filePath = path.join(__dirname, 'test/data/multipage.pdf')
	return extract(filePath)
}

