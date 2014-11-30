define([
  "constants",
  "crossroads",
  "text!aboutTemplate"
], function(C, crossroads, aboutTemplate) {
  "use strict";


  var init = function() {
    crossroads.addRoute("", loadPage);
  };

  var loadPage = function() {
    console.log("not here?", aboutTemplate);
    $("#content").html(aboutTemplate);
  };


  return {
    name: "aboutPage",
    type: C.COMPONENT_TYPES.PAGE,
    init: init
  }
});
