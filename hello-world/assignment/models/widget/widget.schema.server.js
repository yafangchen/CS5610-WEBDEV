var mongoose = require("mongoose"); // mongoDb has no notion of schemas. this is at the application level

var WidgetSchema = mongoose.Schema ({
  pageId : {type : mongoose.Schema.Types.ObjectId, ref: "PageModel"},
  widgetType: {type: String, enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']} ,
  name : {type : String},
  text : String,
  placeholder : String,
  description : String,
  url : String,
  width : String,
  height: Number,
  rows : Number,
  size : Number,
  formatted: Boolean,
  position: Number, //for sortable
  dateCreated : {type: Date, default : Date.now} //Date.now is the current time
}, {collection: "widget" });

module.exports = WidgetSchema;
