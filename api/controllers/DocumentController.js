/**
 * DocumentController
 *
 * @description :: Server-side logic for managing documents
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs');
var path = require('path')

module.exports = {

  extract: function (req, res){
    var packet = req.params.all();
    sails.log.info(packet.fileName)
    var filePath = path.join(process.env.HOME, "data/pdfsearch/", packet.fileName);
    PDFService.extractContents(filePath).then(function (response){
      sails.log.info(response)
      return res.json(200, response)
    }).caught(function (err){
      sails.log.error(err)
      return res.json(500, err);
    })
  }
  
};

