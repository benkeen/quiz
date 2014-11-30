var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

// url encoding
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {

  // normal static file request
  if (path.extname(req.path).length > 0) {
    next();
  } else {
    req.url = '/index.html';
    next();
  }
});

// static file serve
app.use(express.static(__dirname));
app.listen(1234);
console.log("Listening on port 1234");
