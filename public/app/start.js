define([
  "crossroads",
  "header",
  "aboutPage",
  "jsx!questionsPage"
], function(crossroads, header, aboutPage, questionsPage) {

  // initialize the general page components
  header.init();

  // set up all pages. These guys register their own URLs
  aboutPage.init();
  questionsPage.init();

  // load whatever URL is needed
  crossroads.parse(document.location.pathname);

});
