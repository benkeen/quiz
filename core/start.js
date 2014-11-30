// TODO early days!
define([
  "brain",
  "crossroads",
  "hasher",
  "generalEvents",
  "header",
  "aboutPage",
  "jsx!questionsPage"
], function(brain, crossroads, hasher, generateEvents, header, aboutPage, questionsPage) {
  "use strict";

  // set up all pages. These guys register their own URL handlers
  brain.registerPages([aboutPage, questionsPage]);

  // initialize the generic page components
  brain.registerModules([header]);

  // now initialize anything that needs initializing
  brain.initPages();
  brain.initModules();


  // Routing stuff. To be moved to brain
  function parseHash(newHash, oldHash) {
    console.log("changed");
    crossroads.parse(newHash);
  }

  hasher.initialized.add(parseHash);
  hasher.changed.add(parseHash);
  hasher.init();


  hasher.setHash(document.location.pathname);
});
