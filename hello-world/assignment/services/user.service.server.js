module.exports = function (app) {
  var userModel = require("../models/user/user.model.server");
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;

  app.get("/api/user/hello", helloUser);
  app.post("/api/user", createUser);
  app.get("/api/user", findUser);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);
  app.post('/api/login', passport.authenticate('local'), login);
  app.post('/api/logout', logout);
  app.post ('/api/register', register);
  app.get ('/api/loggedin', loggedin);

  passport.use(new LocalStrategy(localStrategy));
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  }

  function register (req, res) {
    var user = req.body;
    userModel
      .createUser(user)
      .then(
        function(user){
          if(user){
            req.login(user, function(err) {
              if(err) {
                res.status(400).send(err);
              } else {
                res.json(user);
              }
            });
          }
        }
      );
  }

  function login(req, res) {
    var user = req.user;
    res.json(user);
  }

  function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
  }


  function localStrategy(username, password, done) {
    userModel
      .findUserByUserName(username)
      .then(
        function(user) {
          if(user != null && user.username === username && user.password === password) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        },
        function(err) {
          if (err) { return done(err); }
        }
      );
  }

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function(user){
          done(null, user);
        },
        function(err){
          done(err, null);
        }
      );
  }

  function helloUser(req, res) {
    res.send("Hello from user service!");
  }

  function createUser(req, res) {
    var newUser = req.body;
    userModel.createUser(newUser)
      .then(function(user) {
        res.json(user);
      })
  }

  function findUser(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];

    if (username && password){
      userModel.findUserByCredentials(username, password)
        .then(function(user) {
          res.json(user);
      })
    } else if (username) {
      userModel.findUserByUserName(username)
        .then(function(user){
          res.json(user);
        })
    } else {
      userModel.findAllUsers()
        .then(function(user){
          res.json(user);
        })
    }
  }

  function findUserById(req, res){
    var userId = req.params["userId"];
    userModel.findUserById(userId)
      .then(function(user) {
        res.json(user);
      })
  }

  function updateUser(req, res) {
    var userId = req.params['userId'];
    var user = req.body;

    userModel.updateUser(userId, user)
      .then(function(status) {
        res.send(status);
      })
  }

  function deleteUser(req, res) {
    var userId = req.params["userId"];
    userModel.deleteUser(userId)
      .then(function(status) {
        res.send(status);
      })
  }
}
