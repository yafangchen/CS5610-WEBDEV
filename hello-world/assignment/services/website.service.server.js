module.exports = function(app){
  var websiteModel = require("../models/website/website.model.server");

  app.get("/api/user/:userId/website", findWebsiteForUser);
  app.post("/api/user/:userId/website", createWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsiteById);

  function updateWebsiteById(req, res){
    var websiteId = req.params['websiteId'];
    var newWebsite = req.body;
    websiteModel.updateWebsiteById(websiteId, newWebsite)
      .then(function(website){
        res.json(website);
      })
  }

  function findWebsiteById(req, res){
    var websiteId = req.params['websiteId'];
    websiteModel.findWebsiteById(websiteId)
      .then(function(website){
        res.json(website);
      })
  }

  function deleteWebsite(req, res){
    var websiteId = req.params['websiteId'];
    websiteModel.deleteWebsite(websiteId)
      .then(function(status){
        res.send(status);
      })
  }

  function createWebsite(req, res){
    var userId = req.params['userId'];
    var website = req.body;
    website.developerId = userId;
    websiteModel.createWebsite(website)
      .then(function(website){
        res.json(website);
      })
  }

  function findWebsiteForUser(req,res) {
    var userId = req.params['userId'];
    websiteModel.findWebsitesForUser(userId)
      .then(function(websites){
        res.json(websites);
      })
  }

  /*
  function findWebsiteForUser(req, res) {
    var userId = req.params['userId'];
    var websites= getWebsitesForUserId(userId);
    console.log(websites);
    res.json(websites);
  }

  function  getWebsitesForUserId(userId) {
    var websites=[];

    for(var i = 0; i < WEBSITES.length; i++) {
      if (WEBSITES[i].developerId === userId) {
        websites.push(WEBSITES[i]);
      }
    }
    return websites;
  }

  function getWebsiteById(websiteId){
    for(var i = 0; i < WEBSITES.length; i++) {
      if (WEBSITES[i]._id === websiteId) {
        return WEBSITES[i];
      }
    }
  }*/
}

