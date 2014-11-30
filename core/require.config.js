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
    pageHelper: "core/pageHelper",
    generalEvents: "core/generalEvents",
    constants: "core/constants",

    // primary top-level templates
    layoutTemplate: "templates/layout.html",

    // pages
    aboutPage: "pages/about/about",
    aboutTemplate: "pages/about/aboutTemplate.html",
    questionsPage: "pages/questions/questions",
    questionsTemplate: "pages/questions/questionsTemplate.html",

    // React components
    header: "react_components/header",
    breadcrumbs: "react_components/breadcrumbs",
    multipleQuestionImage: "react_components/questionType_multipleImages"
  },

  jsx: {
    fileExtension: '.jsx'
  }
});