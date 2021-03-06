
var elasticsearch = require('elasticsearch');
var async = require('async');
var Promise = require('bluebird')
// var esConfig = _.cloneDeep(sails.config.dbconfig.esConfig)
var esClient = elasticsearch.Client()
var fs = require('fs')
var path = require('path');

Promise.promisifyAll(fs);

module.exports = {
  search: search,
  indexDocument: indexDocument,
  indexFile: indexFile,
  indexAllFilesInDirectory: indexAllFilesInDirectory,
  showAllFilesContentInDirectory: showAllFilesContentInDirectory
}

function search(query){
  return esClient.search({
    "index": "pdfsearch",
    "type": "lecture",
    "body": {
      "query": {
        "match": {
          "content": query
        }
      }
    }
  }).then(function (result){
    return result.hits.hits
  })
}

function indexAllFilesInDirectory(directoryPath){
  // iterate through all the files in given directory relative to $HOME
  // call the PDFService.extract function on each and index them to ES
  var directory = path.join(process.env.HOME, directoryPath)
  return fs.readdirAsync(directory).then(function (files){
    return Promise.map(files, function (fileName){
      return indexFile(path.join(directory, fileName)) 
    })
  })
}


function showAllFilesContentInDirectory(directoryPath){
  // iterate through all the files in given directory relative to $HOME
  // call the PDFService.extract function on each and index them to ES
  var directory = path.join(process.env.HOME, directoryPath)
  return fs.readdirAsync(directory).then(function (files){
    return Promise.map(files, function (fileName){
      return PDFService.extractContents(path.join(directory, fileName)).then(sails.log.info)
    })
  })
}



function indexFile(fileName){
  sails.log.info("extractContents from file", fileName)
  return PDFService.extractContents(fileName).then(indexDocument)
}

function indexDocument(content){
  var body = {
    "content": content
  }
  return esClient.index({
    "index": "pdfsearch",
    "type": "lecture",
    "body": body
  })
}
