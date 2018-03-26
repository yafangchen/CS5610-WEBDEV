module.exports = function (app) {
  var widgetModel = require("../models/widget/widget.model.server");
  var multer = require('multer');
  var upload = multer({ dest: __dirname+'/../../dist/assets/uploads' });

  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);
  app.post("/api/upload", upload.single('myFile'), uploadImage);
  app.put("/api/page/:pageId/widget",reorderWidgets);

  function reorderWidgets(req,res) {
    var pageId = req.params.pageId;
    var startIndex = parseInt(req.query.start);
    var endIndex = parseInt(req.query.end);
    widgetModel
      .reorderWidgets(pageId, startIndex, endIndex)
      .then(function (status) {
        res.send(status);
      });

  }

  function findAllWidgetsForPage(req, res) {
    var pageId = req.params['pageId'];
    widgetModel.findAllWidgetsForPage(pageId)
      .then(function(widgets){
        res.json(widgets);
      })
  }

  function createWidget(req, res) {
    var pageId = req.params['pageId'];
    var newWidget = req.body;
    newWidget.pageId = pageId;
    widgetModel.findAllWidgetsForPage(pageId)
      .then(function(widgets){
        var count = widgets.length;
        newWidget.position = count;
        widgetModel.createWidget(newWidget)
          .then(function(widget){
            res.json(widget);
          })
      })
  }

  function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    widgetModel.findWidgetById(widgetId)
      .then(function(widget){
        res.json(widget);
      })
  }

  function updateWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var widget = req.body;
    widget.widgetId = widgetId;
    widgetModel.updateWidgetById(widgetId, widget)
      .then(function(widget){
        res.json(widget);
      })
  }

  function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var pageId = req.query['pageId'];
    var position = req.query['postobedeleted'];
    widgetModel.updatePosition(pageId, position)
         .then(function (stats) {
           widgetModel.deleteWidget(widgetId)
             .then(function (status) {
               res.send(status);
             })
         })
  }

  function uploadImage(req, res) {
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var localhost = "http://localhost:3100";
    var heroku = "https://secret-meadow-76604.herokuapp.com";

    if (myFile == null) {
      res.redirect("/user/" + userId + "/website/" + websiteId +
        "/page/" + pageId + "/widget/" + widgetId)
    }

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widgetModel.updateWidgetUrl(widgetId, '/assets/uploads/'+filename)
      .then(function(data) {
        var callbackUrl   = "/user/" + userId + "/website/" + websiteId +
          "/page/" + pageId + "/widget/" + widgetId;

        res.redirect(callbackUrl);
      });
  }
}
