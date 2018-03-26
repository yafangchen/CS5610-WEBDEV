var mongoose = require("mongoose");
var UserSchema = require("./user.schema.server");

var UserModel = mongoose.model("UserModel", UserSchema);


UserModel.findUserById = findUserById;
UserModel.createUser = createUser;
UserModel.findAllUsers = findAllUsers;
UserModel.findUserByCredentials = findUserByCredentials;
UserModel.findUserByUserName = findUserByUserName;
UserModel.updateUser = updateUser;
UserModel.deleteUser = deleteUser;

module.exports = UserModel;

function deleteUser(userId) {
  return UserModel.remove({_id: userId});
}

function createUser(user){
  return UserModel.create(user);
}


function updateUser(userId, user){
  return UserModel.update({_id: userId}, {
    $set: {firstName : user.firstName,
      lastName : user.lastName}});
}

function findUserByUserName(username){
  return UserModel.findOne({username: username});
}

function findUserByCredentials(username, password){
  return UserModel.findOne({username: username, password: password});
}



function findAllUsers(){
  return UserModel.find();
}

function findUserById(userId){
  return UserModel.findById(userId);
}
