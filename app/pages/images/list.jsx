define([
  "constants",
  "brain",
  "react",
  "jsx!Breadcrumbs"
], function(C, brain, React, Breadcrumbs) {

  // component, register thyself
  var pageName = "imagesPage";
  var component = brain.register({
    name: pageName,
    type: C.COMPONENT_TYPES.PAGE,
    init: function() { // TODO
      brain.crossroads.addRoute("images", loadPage);
    }
  });

  var loadPage = function(opts) {
    component.publish(C.EVENTS.PAGE.LOAD, { page: pageName });

    React.render(
      <ImageList />,
      document.getElementById('content')
    );
  };


  var ImageList = React.createClass({
    getInitialState: function() {
      return {
        breadcrumbs: [{ label: "Images" }],
        breadcrumbsRight: '<a href="#images/add" class="add-image-btn btn btn-default">Upload Image &raquo;</a>'
      };
    },

    render: function() {
      return (
        <div>
          <div id="breadcrumbs">
            <Breadcrumbs breadcrumbs={this.state.breadcrumbs} breadcrumbsRight={this.state.breadcrumbsRight} />
          </div>
          <div id="pageContent">

            <div className="row">
              <div className="col-lg-12">
                <p>
                  Image list here.
                </p>
              </div>
            </div>

          </div>
        </div>
      );
    }
  });

});
