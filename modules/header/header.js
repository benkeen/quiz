define([
  "text!headerTemplate"
], function(headerTemplate) {

  var init = function() {
    $("#header").html(headerTemplate);
  };

  return {
    name: "header",
    init: init
  };
});
