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
    database: "core/database",

    // primary top-level templates
    layoutTemplate: "templates/layout.html",

    // pages
    aboutPage: "pages/about/about",
    aboutTemplate: "pages/about/aboutTemplate.html",
    questionsPage: "pages/questions/questions",
    imagesPage: "pages/images/images",

    // React components
    Header: "react_components/Header",
    Breadcrumbs: "react_components/Breadcrumbs",
    TypeAheadField: "react_components/TypeAheadField",

    QuestionList: "react_components/QuestionList",

    ImageList: "react_components/ImageList",
    ImageUploader: "react_components/ImageUploader/component",
    ImageUploaderStep1: "react_components/ImageUploader/step1",
    ImageUploaderStep2: "react_components/ImageUploader/step2"

  },

  jsx: {
    fileExtension: '.jsx'
  }
});
