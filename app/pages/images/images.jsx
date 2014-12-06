define([
  "constants",
  "brain",
  "pageHelper",
  "react",
  "jsx!ImageList"
], function(C, brain, pageHelper, React, ImageList) {

  // component, register thyself
  var pageName = "imagesPage";
  var component = brain.register({
    name: pageName,
    type: C.COMPONENT_TYPES.PAGE,
    init: init
  });


  function init() {
    brain.crossroads.addRoute("images", loadPage);
    brain.crossroads.addRoute("images/add/", addImagePage);
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
        label: "Add Image"
      }]
    });

    React.render(
      <ImageList />,
      document.getElementById('pageContent')
    );
  };

  function publishPageLoaded() {
    component.publish(C.EVENTS.PAGE.LOAD, { page: pageName });
  };
});
