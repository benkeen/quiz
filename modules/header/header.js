define([
  "constants",
  "brain",
  "text!headerTemplate"
], function(C, brain, headerTemplate) {

  var componentName = "header";

  var init = function() {
    $("#header").html(headerTemplate);

    brain.subscribe(componentName, C.EVENTS.PAGE.LOAD, onLoadPage);
  };

  var onLoadPage = function() {

  };

  return {
    name: componentName,
    type: C.COMPONENT_TYPES.MODULE,
    init: init
  };
});
