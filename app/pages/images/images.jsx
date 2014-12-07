define([
  "constants",
  "brain",
  "pageHelper",
  "react",
  "jsx!ImageList",
  "jsx!ImageUploader"
], function(C, brain, pageHelper, React, ImageList, ImageUploader) {

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
      breadcrumbsRight: '<a href="#images/add" class="add-image-btn btn btn-default">Upload Image &raquo;</a>',
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
      breadcrumbs: [
        { label: "Images", link: "#images" },
        { label: "Add Image" }
      ]
    });

    React.render(
      <ImageUploader />,
      document.getElementById('pageContent')
    );
  };

  function publishPageLoaded() {
    component.publish(C.EVENTS.PAGE.LOAD, { page: pageName });
  };
});
