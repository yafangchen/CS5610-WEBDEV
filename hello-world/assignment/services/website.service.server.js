module.exports = function(app){
  var WEBSITES = require("./website.mock.server");

  app.get("/api/user/:userId/website", findWebsiteForUser);
  app.post("/api/user/:userId/website", createWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsiteById);

  function updateWebsiteById(req, res){
    var userId = req.params['userId'];
    var websiteId = req.params['websiteId'];
    var newWebSite = req.body;
    for(var i = 0; i < WEBSITES.length; i++) {
      if (WEBSITES[i]._id === websiteId) {
        WEBSITES[i].name = newWebSite.name;
        break;
      }
    }
    res.json(getWebsitesForUserId(userId));
  }

  function findWebsiteById(req, res){
    var user = req.params['userId'];
    var websiteId = req.params['websiteId'];
    res.json(getWebsiteById(websiteId));
  }

  function deleteWebsite(req, res){
    var userId = req.params['userId'];
    var websiteId = req.params['websiteId'];
    for(var i = 0; i < WEBSITES.length; i++) {
      if (WEBSITES[i]._id === websiteId) {
        WEBSITES.splice(i, 1);
        var websites = getWebsitesForUserId(userId);
        res.json(websites);
        return;
      }
    }

  }

  function createWebsite(req, res){
    var userId = req.params['userId'];
    var website = req.body;
    website._id = (new Date()).getTime() + "";
    website.developerId = userId;
    WEBSITES.push(website);
    var websites = getWebsitesForUserId(userId);
    res.json(websites);
  }

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
  }
}

