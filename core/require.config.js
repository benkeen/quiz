requirejs.config({
  baseUrl: '/',
  paths: {

    // libraries
    crossroads: "libs/crossroads.min",
    hasher: "libs/hasher.min",
    signals: "libs/signals.min",
    text: "libs/text",
    jsx: "libs/jsx",
    JSXTransformer: "libs/JSXTransformer",
    react: "libs/react",

    // core stuff
    start: "core/start",
    brain: "core/brain",
    generalEvents: "core/generalEvents",
    constants: "core/constants",

    // pages
    aboutPage: "pages/about/about",
    aboutTemplate: "pages/about/aboutTemplate.html",
    questionsPage: "pages/questions/questions",
    questionsTemplate: "pages/questions/questionsTemplate.html",

    // modules
    header: "modules/header/header",
    headerTemplate: "modules/header/headerTemplate.html",
    multipleQuestionImage: "modules/multipleQuestionImage/add"
  },

  jsx: {
    fileExtension: '.jsx'
  }
});
