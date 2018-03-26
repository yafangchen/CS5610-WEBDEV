var mongoose = require("mongoose");
var PageSchema = require("./page.schema.server");
var PageModel = mongoose.model('PageModel', PageSchema);

var WebsiteModel = require("../website/website.model.server");

PageModel.createPage = createPage;
PageModel.findAllPagesForWebsite = findAllPagesForWebsite;
PageModel.deletePage = deletePage;
PageModel.findPageById = findPageById;
PageModel.updatePageById = updatePageById;

module.exports = PageModel;

function updatePageById(pageId, page) {
  return PageModel.update({_id: pageId}, {
    $set: {name: page.name,
      title: page.title}});
}

function findPageById(pageId) {
  return PageModel.findOne({_id: pageId});
}

function deletePage(pageId) {
  return PageModel.findOne({_id: pageId})
    .then(function(responsePage){
      var websiteId = responsePage.websiteId;
      WebsiteModel.findWebsiteById(websiteId)
        .then(function(website) {
          var pages = website.pages;
          for(var i = 0; i < pages.length; i++) {
            if (pages[i]._id.toString() === pageId) {
              pages.splice(i, 1);
              break;
            }
          }
          website.save();
          return PageModel.remove({_id: pageId});
        })
    });
}

function findAllPagesForWebsite(websiteId){
  return PageModel.find({"websiteId": websiteId});
}


function createPage(page){
  return PageModel.create(page)
    .then(function(responsePage){
      WebsiteModel.findWebsiteById(page.websiteId)
        .then(function(website){
          website.pages.push(responsePage);
          return website.save();
        })
    });
}
