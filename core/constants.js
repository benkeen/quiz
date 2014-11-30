define([], function() {

  var CONSTANTS = {};

  CONSTANTS.DEBUG = true;

  CONSTANTS.CORE = {
    APP_VERSION:  "0.0.1",
    RELEASE_DATE: "",
    GITHUB_URL:   "https://github.com/benkeen/quiz"
  };

  CONSTANTS.COMPONENT_TYPES = {
    MODULE: 'module',
    PAGE: 'page'
  };

  CONSTANTS.EVENTS = {
    PAGE: {
      LOAD: 'event-page-load'
    }
  };

  return CONSTANTS;
});
