var mongoose = require("mongoose");
var WebsiteSchema = require("./website.schema.server");
var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);

var UserModel = require("../user/user.model.server");

WebsiteModel.createWebsite = createWebsite;
WebsiteModel.findWebsitesForUser = findWebSitesForUser;
WebsiteModel.deleteWebsite = deleteWebsite;
WebsiteModel.findWebsiteById = findWebsiteById;
WebsiteModel.updateWebsiteById = updateWebsiteById;

module.exports = WebsiteModel;

function updateWebsiteById(websiteId, website) {
  return WebsiteModel.update({_id: websiteId}, {
    $set: {description : website.description,
      name : website.name}});
}

function findWebsiteById(websiteId) {
  return WebsiteModel.findOne({_id: websiteId});
}

function deleteWebsite(websiteId) {
  return WebsiteModel.findOne({_id: websiteId})
    .then(function(responseWebsite){
      var userId = responseWebsite.developerId;
      UserModel.findUserById(userId)
        .then(function(user) {
          var websites = user.websites;
          for(var i = 0; i < websites.length; i++) {
            if (websites[i]._id.toString() === websiteId) {
              websites.splice(i, 1);
              break;
            }
          }
          user.save();
          return WebsiteModel.remove({_id: websiteId});
        })
    });
}

function findWebSitesForUser(userId){
  return WebsiteModel.find({"developerId": userId})
  //.populate('developerId')
    .populate('developerId', 'username')
    .exec();
}


function createWebsite(website){
  return WebsiteModel.create(website)
    .then(function(responseWebsite){
      UserModel.findUserById(website.developerId)
        .then(function(user){
          user.websites.push(responseWebsite);
          return user.save();
        })
    });
}
