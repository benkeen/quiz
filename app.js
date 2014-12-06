var express = require('express');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var path = require('path');
var fs = require('fs-extra');


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
    //var newFilename = getUploadedFilename(root, filename);
    var newFilename = filename;
    fstream = fs.createWriteStream(root + newFilename);

    file.pipe(fstream);
    fstream.on('close', function() {
      res.write({ filename: newFilename });
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


/**
 * Helper function to get a safe filename for an uploaded file. It checks the folder for filename conflicts.
 * @param folder
 * @param filename
 * @returns {*}
 */
function getUploadedFilename(folder, filename) {
  var currFilename = filename;
  var num = 1;

  // as long as the file exists, keep adding a -N suffix until we fi
  while (fs.existsSync(folder + currFilename)) {
    var parts = currFilename.split(".");
    var extension = parts.pop();
    var filenameWithoutExtension = parts.join(".");

    console.log("file existed: ", filenameWithoutExtension, extension);

    // if the file is taken, keep increasing the
    if (endsWith(filenameWithoutExtension, "-" + num)) {
      var suffix = new RegExp('-' + num);
      num++;
      currFilename = currFilename.replace(suffix, '-' + num) + "." + extension;
    } else {
      console.log(filenameWithoutExtension + '-' + num + "." + extension);
      currFilename = filenameWithoutExtension + '-' + num + "." + extension;
    }
  };

  return currFilename;
}

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}


app.listen(1234);
console.log("Listening on port 1234");
