var mongoose = require("mongoose");

var widgetSchema = require("../widget/widget.schema.server");

var PageSchema = mongoose.Schema ({
  websiteId : {type : mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"},
  name : {type : String, required : true},
  title : String,
  widgets:[widgetSchema],
  dateCreated : {type: Date, default : Date.now} //Date.now is the current time
}, {collection: "page" });

module.exports = PageSchema;
