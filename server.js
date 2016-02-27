var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.resolve(__dirname, 'public')));

var server = app.listen(3000, function() {
  console.log('Server listening on port', server.address().port);
});