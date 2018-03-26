var mongoose = require('mongoose');
var pageSchema = require('../page/page.schema.server');

var websiteSchema =mongoose.Schema({
  name: String,
  developerId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
  description: String,
  pages: [pageSchema],
  dateCreated : {type: Date, default : Date.now}
}, {collection: 'website'});

module.exports = websiteSchema;
