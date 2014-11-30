define([
  "crossroads",
  "text!aboutTemplate"
], function(crossroads, aboutTemplate) {

  var _init = function() {
    crossroads.addRoute("/", _loadPage);
  };

  var _loadPage = function() {
    $("#content").html(aboutTemplate);
  };

  return {
    init: _init
  }
});
