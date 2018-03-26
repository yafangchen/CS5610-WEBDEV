module.exports = function(app) {
  require("./models/model.js");
  require("./services/user.service.server.js")(app);
  require("./services/website.service.server.js")(app);
  require("./services/page.service.server.js")(app);
  require("./services/widget.service.server.js")(app);
  //var db = require("./models/model.js");
};
