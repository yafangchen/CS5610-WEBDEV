module.exports = function (app) {
  var WIDGETS = require("./widget.mock.server");

  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);

  function findAllWidgetsForPage(req, res) {
    var pageId = req.params['pageId'];
    var widgets = getWidgetsForPage(pageId);
    res.json(widgets);
  }

  function getWidgetsForPage(pageId) {
    var widgets = []
    for (var i = 0; i < WIDGETS.length; i++) {
      if (WIDGETS[i].pageId === pageId) {
        widgets.push(WIDGETS[i]);
      }
    }
    return widgets;
  }

  function createWidget(req, res) {
    var pageId = req.params['pageId'];
    var newWidget = req.body;
    newWidget._id = (new Date()).getTime() + "";
    WIDGETS.push(newWidget);
    res.json(getWidgetsForPage(pageId));
  }

  function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    res.json(getWidgetById(widgetId));
  }

  function getWidgetById(widgetId) {
    return WIDGETS.find(function (widget) {
      return widget._id === widgetId;
    });
  }

  function updateWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var widget = req.body;
    for (var i = 0; i < WIDGETS.length; i++) {
      if (WIDGETS[i]._id === widgetId) {
        switch (WIDGETS[i].widgetType) {
          case 'HEADER':
            WIDGETS[i].text = widget.text;
            WIDGETS[i].size = widget.size;
            break;

          case 'IMAGE':
            WIDGETS[i].text = widget.text;
            WIDGETS[i].url = widget.url;
            WIDGETS[i].width = widget.width;
            break;

          case 'YOUTUBE':
            WIDGETS[i].text = widget.text;
            WIDGETS[i].url = widget.url;
            WIDGETS[i].width = widget.width;
        }
      }
    }
    res.json(getWidgetById(widgetId));
  }

  function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];
    for (var i = 0; i < WIDGETS.length; i++) {
      if (WIDGETS[i]._id === widgetId) {
        WIDGETS.splice(i, 1);
        res.status(200).send("widget deleted");
        return;
      }
    }
    res.status(404).send("widget not found");
  }

}
