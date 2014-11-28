requirejs.config({
  baseUrl: '',
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
    start: "app/start",
    mediator: "core/mediator",
    constants: "core/constants",

    // pages
    aboutPage: "app/pages/about/about",
    aboutTemplate: "app/pages/about/aboutTemplate.html",
    questionsPage: "app/pages/questions/questions",
    questionsTemplate: "app/pages/questions/questionsTemplate.html",

    // modules
    header: "app/modules/header/header",
    headerTemplate: "app/modules/header/headerTemplate.html"
  },

  jsx: {
    fileExtension: '.jsx'
  }
});
