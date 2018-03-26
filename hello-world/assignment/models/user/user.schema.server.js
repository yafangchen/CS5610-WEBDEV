var mongoose = require("mongoose");
var WebsiteSchema = require('../website/website.schema.server')

var UserSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName:String,
  lastName: String,
  websites:[WebsiteSchema]
  //dob: Date,
  //salary: Number,
}, {collection:'user'});

module.exports = UserSchema;
