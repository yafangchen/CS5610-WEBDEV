module.exports = function (app) {
  var PAGES = require("./page.mock.server");

  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  function findAllPagesForWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var pages = getPagesForWebsite(websiteId);
    res.json(pages);
  }

  function getPagesForWebsite(websiteId) {
    var pages = [];
    for (var i = 0; i < PAGES.length; i++) {
      if (PAGES[i].websiteId === websiteId) {
        pages.push(PAGES[i]);
      }
    }
    return pages;
  }

  function createPage(req, res) {
    var websiteId = req.params['websiteId'];
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    page.websiteId = websiteId;
    PAGES.push(page);
    var pages = getPagesForWebsite(websiteId);
    res.json(pages);
  }

  function findPageById(req, res) {
    var pageId = req.params['pageId'];
    var page = getPageById(pageId);
    res.json(page);
  }

  function getPageById(pageId) {
    return PAGES.find(function (page) {
      return page._id === pageId;
    });
  }

  function updatePage(req, res) {
    var pageId = req.params['pageId'];
    var newPage = req.body;
    for (var i = 0; i < PAGES.length; i++) {
      if (PAGES[i]._id === pageId) {
        PAGES[i].name = newPage.name;
        PAGES[i].title = newPage.title;
        break;
      }
    }
    res.json(getPageById(pageId));
  }

  function deletePage(req, res) {
    var pageId = req.params['pageId'];
    for (var i = 0; i < PAGES.length; i++) {
      if (PAGES[i]._id === pageId) {
        PAGES.splice(i, 1);
        res.status(200).send("page deleted");
        return;
      }
    }
    res.status(404).send("page not found");
  }
}
