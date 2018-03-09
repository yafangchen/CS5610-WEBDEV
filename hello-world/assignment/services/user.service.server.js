module.exports = function (app) {
  var USERS = require("./user.mock.server");
  app.get("/api/user/hello", helloUser);
  //app.get("/api/user", findAllUsers);
  app.post("/api/user", createUser);
  app.get("/api/user", findUser);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);

  function helloUser(req, res) {
    res.send("Hello from user service!");
  }

  function findAllUsers(req, res) {
    res.json(USERS);
  }

  function createUser(req, res) {
    var user = req.body;
    USERS.push(user);
    res.json(USERS);
  }

  function findUser(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];

    var user = null;

    if (username && password){
      user = USERS.find(function (user) {
        return user.username === username && user.password === password;
      });
    } else if (username) {
      user = USERS.find(function (user) {
        return user.username === username;
      });
    }
    res.json(user);
  }

  function findUserById(req, res){
    var userId = req.params["userId"];
    var user = USERS.find(function (user) {
      return user._id === userId;
    });
    res.json(user);
  }

  function updateUser(req, res) {
    var userId = req.params['userId'];
    var user = req.body;

    console.log(req.body);
    console.log("update user: " + userId + " " + user.firstName + " " + user.lastName);

    for(var i = 0; i < USERS.length; i++) {
      if (USERS[i]._id === userId) {
        USERS[i].firstName = user.firstName;
        USERS[i].lastName = user.lastName;
        res.status(200).send(USERS[i]);
        return;
      }
    }
    res.status(404).send("not found!");
  }

  function deleteUser(req, res) {
    var userId = req.params["userId"];
    for (var i = 0; i < USERS.length; i++) {
      if (USERS[i]._id === userId) {
        USERS.splice(i, 1);
        res.json(users);
        return;
      }
    }
  }
}
