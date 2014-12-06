define([
  "constants",
  "brain",
  "jsx!pageHelper",
  "text!aboutTemplate"
], function(C, brain, pageHelper, aboutTemplate) {
  "use strict";

  // component, register thyself
  var pageName = "aboutPage";
  var component = brain.register({
    name: pageName,
    type: C.COMPONENT_TYPES.PAGE,
    init: init
  });

  function init() {
    brain.crossroads.addRoute("", loadPage);
    brain.crossroads.addRoute("about", loadPage);
  };

  function loadPage() {
    component.publish(C.EVENTS.PAGE.LOAD, { page: pageName });

    // set the page template
    pageHelper.renderPage({
      breadcrumbs: [{ label: "About" }],
      pageContent: aboutTemplate
    });
  };

});
