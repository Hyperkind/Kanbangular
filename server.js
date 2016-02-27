var express = require('express');

var app = express();

var server = app.listen(3000, function() {
  console.log('Server listening on port', server.address().port);
});