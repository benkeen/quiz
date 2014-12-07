var express = require('express');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var path = require('path');
var fs = require('fs-extra');
var helpers = require('./code/helpers.js');


var app = express();
app.use(busboy());

// static file serve
app.use(express.static(__dirname + "/app"));

// url encoding
app.use(bodyParser.urlencoded({ extended: false }));

// file upload
app.route('/upload').post(function(req, res, next) {
  var fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function(fieldname, file, filename) {
    var root = __dirname + "/app/img/";
    var newFilename = helpers.getUploadedFilename(root, filename);
    fstream = fs.createWriteStream(root + newFilename);

    file.pipe(fstream);
    fstream.on('close', function() {

      // return the new filename to the client
      res.write('{ "filename": "' + newFilename + '" }');
      res.end();
    });
  });
});

app.use(function (req, res, next) {
  if (path.extname(req.path).length > 0) {
    next();
  } else {
    req.url = '/index.html';
    next();
  }
});


app.listen(1234);
console.log("Listening on port 1234");
