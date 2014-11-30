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

  // register all pages and modules. Right now pages register their own URL handlers
  brain.register([aboutPage, questionsPage, header]);

  // initialize anything that needs initializing
  brain.init();


  // Routing stuff. To be moved to brain
  function parseHash(newHash, oldHash) {
    console.log("changed");
    crossroads.parse(newHash);
  }

  hasher.initialized.add(parseHash);
  hasher.changed.add(parseHash);
  hasher.init();

  var initialPath = document.location.pathname;
  if (initialPath === '/') {
    initialPath = "";
  }
  hasher.setHash(initialPath);
});
