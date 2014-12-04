define([], function() {

  var CONSTANTS = {};

  CONSTANTS.DEBUG = true;

  CONSTANTS.CORE = {
    APP_VERSION: "0.0.1",
    RELEASE_DATE: "",
    GITHUB_URL: "https://github.com/benkeen/quiz"
  };

  CONSTANTS.DB = {
    BASE_URL: "http://localhost:8000",

    // Databases
    QUESTIONS: {
      NAME: 'questions'
    },
    BIRD_SPECIES: {
      NAME: 'bird_species',
      VIEWS: {
        SPECIES_LIST: 'species/speciesList'
      }
    },
    BIRD_IMAGES: {
      NAME: 'bird_images'
    }
  };

  CONSTANTS.COMPONENT_TYPES = {
    MODULE: 'module',
    PAGE: 'page'
  };

  CONSTANTS.EVENTS = {
    PAGE: {
      LOAD: 'event-page-load'
    },
    TYPEAHEAD_ITEM_SELECTED: 'event-typeahead-component-loaded',
    CONTINUE: 'continue'
  };

  return CONSTANTS;
});
