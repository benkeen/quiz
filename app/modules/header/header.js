define([
  "text!headerTemplate"
], function(headerTemplate) {

  var _init = function() {
    $("#header").html(headerTemplate);


  };

  return {
    init: _init
  };
});
