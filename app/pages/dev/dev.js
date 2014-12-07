define([
  "constants",
  "brain",
  "jsx!pageHelper",
  "text!devTemplate"
], function(C, brain, pageHelper, devTemplate) {
  "use strict";

  var pageName = "devPage";
  var component = brain.register({
    name: pageName,
    type: C.COMPONENT_TYPES.PAGE,
    init: init
  });

  function init() {
    brain.crossroads.addRoute("", loadPage);
    brain.crossroads.addRoute("dev", loadPage);
  };

  function loadPage() {
    component.publish(C.EVENTS.PAGE.LOAD, { page: pageName });

    // set the page template
    pageHelper.renderPage({
      breadcrumbs: [{ label: "Dev Helper Page" }],
      pageContent: devTemplate
    });
  };

});
