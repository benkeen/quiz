define([
  "crossroads",
  "text!aboutTemplate"
], function(crossroads, aboutTemplate) {
  "use strict";

  var _init = function() {
    crossroads.addRoute("/", _loadPage);
  };

  var _loadPage = function() {
    $("#content").html(aboutTemplate);
  };

  return {
    name: "aboutPage",
    init: _init
  }
});
