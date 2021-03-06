var express = require('express');
var path = require('path');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var session = require('express-session');
var router = express.Router();
var isAuthenticated = require('./middleware/isAuthenticated');
var CONFIG = require('./config');
var db = require('./models');
var cards = db.card;
var users = db.user;

var crypto = require('crypto');
var bcrypt = require('bcrypt');

var passSecret = 'abcdefg';  //CONFIG.crypto.secret;
var hash = crypto.createHmac('sha256', passSecret)
                 .update('I love cupcakes')
                 .digest('hex');

console.log(hash);

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
  secret: CONFIG.session.secret
}));
app.use(passport.initialize());
app.use(passport.session());

// links loin page to users database and checks for correct login
passport.use(new localStrategy (
  {
    passReqToCallback: true
  },
  function (req, username, password, done) {
    return users.find({
      where:{
        username: username
      }
    })
    .then(function (user) {
      if (user.password !== password) {
        return done(null, false);
      }
      return done(null, user);
    })
    .catch(function (err) {
      return done(null, false);
    });
  })
);

passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function (userId, done) {
  users.findById(userId)
    .then(function(userId) {
      if (!userId) {
        return done(null, false);
      }
      return done(null, userId);
    });
});

// API to get all cards in database
// cards only show when logged in
app.get('/api/cards', isAuthenticated, function(req, res) {
  cards.findAll({})
    .then(function(cards) {
      res.json(cards);
    });
});

// API to get all users in database
app.get('/api/users', isAuthenticated, function(req, res) {
  users.findAll({})
    .then(function(users) {
      res.json(users);
    });
});

app.route('/api/cards/:cardId')
  .get(function(req, res) {
    console.log(req.params.cardId);
    cards.findOne({
      where: {
        id: parseInt(req.params.cardId)
      }
    })
    .then(function(card) {
      res.json(card);
    });
  })
  .put(function(req, res) {
      var cardUpdates = {
        title: req.body.title,
        priority: req.body.priority,
        status: req.body.status,
        assignedTo: req.body.assignedTo
      };
    var query = {
      where: {
        id: parseInt(req.params.cardId)
      }
    };

    cards.update(cardUpdates, query);
      // .then(function() {
      //   res.render('/');
      // });
  })
  .delete(function(req, res) {
    cards.destroy({
      where: {
        id: parseInt(req.params.cardId)
      }
    });
  });

// app.get('/api/cards/:cardId', isAuthenticated, function(req, res) {
//   cards.findOne({
//     where: {
//       id: parseInt(req.params.cardId)
//     }
//   })
//   .then(function(card) {
//     res.json(card);
//   });
// });

// app.put('/api/cards/:cardId', isAuthenticated, function(req, res) {
//   var cardUpdates = {
//     title: req.body.title,
//     priority: req.body.priority,
//     status: req.body.status,
//     assignedTo: req.body.assignedTo
//   };
//   var query = {
//     where: {
//       id: parseInt(req.params.cardId)
//     }
//   };
//   cards.update(cardUpdates, query)
//   .then(function() {
//     res.sendFile('/dashboard/index.html');
//   });
// });

// app.delete('/api/cards/:cardId', isAuthenticated, function(req, res) {
//   cards.destroy({
//     where: {
//       id: parseInt(req.params.cardId)
//     }
//   });
// });

app.post('/', isAuthenticated, function(req, res) {
  cards.create(req.body)
    .then(function(card) {
      res.sendFile('/dashboard');
    });
});

app.get('/dashboard', isAuthenticated, function(req, res) {
  res.sendFile('/dashboard');
});

app.route('/newUser')
  .get(function(req, res) {
    res.redirect('/newUser.html');
  })
  .post(function(req, res) {
    users.create(req.body)
      .then(function() {
        res.redirect('/');
      });
  });

app.route('/login')
  .get(function(req, res) {
    res.redirect('/login.html');
  })
  .post(
    passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/dashboard/#/kanban'})
  );

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

db.sequelize
  .sync()
  .then(function() {
    app.listen(3000, function() {
      console.log('Server listening');
    });
  });