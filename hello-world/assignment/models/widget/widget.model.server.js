var mongoose = require("mongoose");
var WidgetSchema = require("./widget.schema.server");
var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

var PageModel = require("../page/page.model.server");

WidgetModel.createWidget = createWidget;
WidgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
WidgetModel.deleteWidget = deleteWidget;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.updateWidgetById = updateWidgetById;
WidgetModel.updateWidgetUrl = updateWidgetUrl;
WidgetModel.reorderWidgets = reorderWidgets;
WidgetModel.updatePosition = updatePosition;

module.exports = WidgetModel;

function updatePosition (pageId, position) {
  return WidgetModel.find({_page:pageId}, function (err, widgets) {
    widgets.forEach (function (widget) {
      if(widget.position > position){
        widget.position--;
        widget.save();
      }
    })
  })
}

function reorderWidgets(pageId, startIndex, endIndex) {
  return WidgetModel.find({_page:pageId}, function (err,widgets) {
    widgets.forEach (function (widget) {
      if(startIndex < endIndex){
        if(widget.position === startIndex){
          widget.position = endIndex;
          widget.save();
        }else if (widget.position > startIndex
          && widget.position <= endIndex){
          widget.position --;
          widget.save();
        }else {
          if(widget.position === startIndex){
            widget.position = endIndex;
            widget.save();
          } else if(widget.position < startIndex
            && widget.position >= endIndex){
            widget.position ++;
            widget.save();
          }
        }
      }
    })
  })
}

function updateWidgetUrl(widgetId, newUrl) {
  return WidgetModel.update({_id: widgetId}, {$set: {url: newUrl}});
}

function createWidget(widget) {
  return WidgetModel.create(widget)
    .then(function(responseWidget){
      PageModel.findPageById(widget.pageId)
        .then(function(page){
          page.widgets.push(responseWidget);
          return page.save();
        })
    });
}

function findAllWidgetsForPage(pageId) {
  return WidgetModel.find({"pageId": pageId});
}

function deleteWidget(widgetId) {
  return WidgetModel.findOne({_id: widgetId})
    .then(function(responseWidget){
      var pageId = responseWidget.pageId;
      PageModel.findPageById(pageId)
        .then(function(page) {
          var widgets = page.widgets;
          for(var i = 0; i < widgets.length; i++) {
            if (widgets[i]._id.toString() === widgetId) {
              widgets.splice(i, 1);
              break;
            }
          }
          page.save();
          return WidgetModel.remove({_id: widgetId});
        })
    });
}

function findWidgetById(widgetId) {
  return WidgetModel.findOne({_id: widgetId});
}

function updateWidgetById(widgetId, newWidget) {
  return WidgetModel.findOne({_id: widgetId})
    .then(function(widget){
      newWidget._id = widgetId;
      newWidget.widgetType = widget.widgetType;
      newWidget.pageId = widget.pageId;
      newWidget.position = widget.position;
      return WidgetModel.update({_id: widgetId}, newWidget);
    })
}
