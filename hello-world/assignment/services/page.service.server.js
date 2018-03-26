module.exports = function (app) {
  var pageModel = require("../models/page/page.model.server");

  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePageById);
  app.delete("/api/page/:pageId", deletePage);

  function findAllPagesForWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    pageModel.findAllPagesForWebsite(websiteId)
      .then(function(pages){
        res.json(pages);
      })
  }

  function createPage(req, res) {
    var websiteId = req.params['websiteId'];
    var page = req.body;
    page.websiteId = websiteId;
    pageModel.createPage(page)
      .then(function(page){
        res.json(page);
      })
  }

  function findPageById(req, res) {
    var pageId = req.params['pageId'];
    pageModel.findPageById(pageId)
      .then(function(page){
        res.json(page);
      })
  }

  function updatePageById(req, res) {
    var pageId = req.params['pageId'];
    var newPage = req.body;
    pageModel.updatePageById(pageId, newPage)
      .then(function(page){
        res.json(page);
      })
  }

  function deletePage(req, res) {
    var pageId = req.params['pageId'];
    pageModel.deletePage(pageId)
      .then(function(status){
        res.send(status);
      })
  }
}
