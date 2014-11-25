var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(1234);
console.log('Listening on port 1234');
