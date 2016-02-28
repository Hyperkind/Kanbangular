var express = require('express');
var path = require('path');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');

var app = express();

var CONFIG = require('./config');
var db = require('./models');
var card = db.card;

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));

app.get('/api', function(req, res) {
  card.findAll({})
    .then(function(cards) {
      res.json(cards);
    });
});

app.post('/', function(req, res) {
  console.log(req.body);
  card.create(req.body)
    .then(function(card) {
      res.redirect('/');
    });
});

var server = app.listen(3000, function() {
  console.log('Server listening on port', server.address().port);
});

// db.sequelize
//   .sync()
//   .then(function () {
//     app.listen(CONFIG.PORT, function() {
//       console.log('Server listening on port', CONFIG.PORT);
//     });
//   });
