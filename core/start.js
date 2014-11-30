// TODO early days!
define([
  "brain",
  "generalEvents",
  "jsx!header",
  "aboutPage",
  "jsx!questionsPage"
], function(brain, generateEvents, header, aboutPage, questionsPage) {
  "use strict";

  // register all pages and modules. Right now pages register their own URL handlers
  brain.register([aboutPage, questionsPage, header]);

  // initialize anything that needs initializing
  brain.initComponents();

  // start 'er up!
  brain.start();
});
