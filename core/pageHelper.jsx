define([
  "react",
  "text!layoutTemplate",
  "jsx!breadcrumbs"
], function(React, layoutTemplate, Breadcrumbs) {
  "use strict";

  var lastTemplate = null;
  var templates = {};

  var breadcrumbs;

  var addBreadcrumbs = function(data) {
    console.log("in addBreadcrumbs: ", data);

    breadcrumbs = React.render(
      <Breadcrumbs breadcrumbs={data} />,
      document.getElementById('breadcrumbs')
    )
  };

  var renderPage = function(options) {
    var opts = $.extend({
      template: "main",
      breadcrumbs: "",
      pageContent: ""
    }, options);

    // if the main template just changed, render the whole thing.
    if (opts.template !== lastTemplate) {
      $("#content").html(layoutTemplate); // obviously TODO when we need it
    }


    if (opts.breadcrumbs) {
      addBreadcrumbs(opts.breadcrumbs);
    }

    // let's assume there's always content [this could be React too, maybe...]
    $("#pageContent").html(opts.pageContent);

    // note that this new template is the most recent one being used
    lastTemplate = opts.template;
  };


  return {
    renderPage: renderPage
  };

});
