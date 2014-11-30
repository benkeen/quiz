define([
  "constants",
  "brain",
  "jsx!pageHelper",
  "crossroads",
  "text!aboutTemplate"
], function(C, brain, pageHelper, crossroads, aboutTemplate) {
  "use strict";

  var componentID = "aboutPage";

  var init = function() {
    crossroads.addRoute("", loadPage);
    crossroads.addRoute("about", loadPage);
  };

  var loadPage = function() {

    // notify anyone that's interested that this component just loaded (be nice to centralize...)
    brain.publish(componentID, C.EVENTS.PAGE.LOAD, { page: componentID });

    // set the page template
    pageHelper.renderPage({
      breadcrumbs: [{ label: "About" }],
      pageContent: aboutTemplate
    });
  };


  return {
    name: componentID,
    type: C.COMPONENT_TYPES.PAGE,
    init: init
  }
});
