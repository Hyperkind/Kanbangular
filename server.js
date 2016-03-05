var express = require('express');
var path = require('path');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var router = express.Router();
var isAuthenticated = require('./middleware/isAuthenticated');
var CONFIG = require('./config');
var db = require('./models');
var cards = db.card;
var users = db.user;

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());

// links loin page to users database and checks for correct login
passport.use(new localStrategy (
  {
    passReqToCallback: true
  },
  function (req, username, password, done) {
    users.findOne({
      where:{
        username: username
      }
    })
    .then(function (user) {
      if (user.password !== password) {
        console.log('password incorrect');
        return done(null, false);
      }
      else if (!user.username) {
        console.log('user not found');
      }
      console.log('logging in');
      return done(null, user);
    })
    .catch(function (err) {
      return done(null, false);
    });
  })
);

passport.serializeUser(function (user, done) {
  console.log('serializeUser', user);
  return done(null, user.id);
});

passport.deserializeUser(function (userId, done) {
  console.log('deserializeUser');
  user.findOne(userId)
    .then(function(user) {
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    });

});

// API to get all cards in database
app.get('/api/cards', function(req, res) {
  console.log(req.user);
  cards.findAll({})
    .then(function(cards) {
      res.json(cards);
    });
});

// API to get all users in database
app.get('/api/users', function(req, res) {
  users.findAll({})
    .then(function(users) {
      res.json(users);
    });
});

app.get('/api/cards/edit/:cardId', function(req, res) {
  console.log(req.body);
  cards.findOne({
    where: {
      id: parseInt(req.params.cardId)
    }
  })
  .then(function(card) {
    res.json(card);
  });
});

app.delete('/api/cards/delete/:cardId', function(req, res) {
  cards.destroy({
    where: {
      id: parseInt(req.params.cardId)
    }
  })
  .then(function() {
    res.redirect('/');
  });
});

app.post('/', function(req, res) {
  cards.create(req.body)
    .then(function(card) {
      res.redirect('/');
    });
});

app.route('/login')
  .get(function(req, res) {
    res.redirect('/login.html');
  })
  .post(
    passport.authenticate('local', { failureRedirect: '/login'}),
    function(req, res) {
      res.redirect('/');
    }
  );

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// app.put();

// app.delete();

var server = app.listen(3000, function() {
  console.log('Server listening on port', server.address().port);
});