// TODO early days!
define([
  "brain",
  "generalEvents",
  "jsx!Header",
  "aboutPage",
  "jsx!questionsPage"
], function(brain, generateEvents, Header, aboutPage, questionsPage) {
  "use strict";

  // register all pages and modules. Right now pages register their own URL handlers
  brain.register([aboutPage, questionsPage, Header]);

  // initialize anything that needs initializing
  brain.initComponents();

  // start 'er up!
  brain.start();
});
