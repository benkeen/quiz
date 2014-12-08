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
    react: "libs/react-with-addons",

    // core stuff
    start: "core/start",
    brain: "core/brain",
//    pageHelper: "core/pageHelper",
    generalEvents: "core/generalEvents",
    constants: "core/constants",
    database: "core/database",

    // primary top-level templates
    layoutTemplate: "templates/layout.html",

    // pages
    aboutPage: "pages/about/about",
    questionsPage: "pages/questions/questions",
    imagesPage: "pages/images/list",
    uploadImagePage: "pages/images/upload",
    ImageUploaderStep1: "pages/images/step1",
    ImageUploaderStep2: "pages/images/step2",
    ImageUploaderStep3: "pages/images/step3",
    devPage: "pages/dev/dev",

    // React components
    Header: "react_components/Header",
    Breadcrumbs: "react_components/Breadcrumbs",
    TypeAheadField: "react_components/TypeAheadField",

    QuestionList: "react_components/QuestionList"
  },

  jsx: {
    fileExtension: '.jsx'
  }
});
