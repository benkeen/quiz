define([
  "constants",
  "brain",
  "pageHelper",
  "react"
], function(C, brain, pageHelper, React) {

  // component, register thyself
  var pageName = "imagesPage";
  var component = brain.register({
    name: pageName,
    type: C.COMPONENT_TYPES.PAGE,
    init: init
  });


  function init() {
    brain.crossroads.addRoute("images", loadPage);
    brain.crossroads.addRoute("images/add/{type}", addImagePage);
  };

  function loadPage(opts) {
    publishPageLoaded(); // boo

    // set the page template
    pageHelper.renderPage({
      breadcrumbs: [{ label: "Images" }],
      pageContent: ""
    });

    React.render(
      <ImageList />,
      document.getElementById('pageContent')
    );
  };


  function addImagePage() {
    publishPageLoaded();

    // set the page template
    pageHelper.renderPage({
      breadcrumbs: [{
        label: "Images", link: "#images"
      }, {
        label: "Add Question"
      }]
    });

    React.render(
      <MultipleChoiceQuestion />,
      document.getElementById('pageContent')
    );
  };

  function publishPageLoaded() {
    component.publish(C.EVENTS.PAGE.LOAD, { page: pageName });
  };
});
