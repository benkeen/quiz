define([
  "constants",
  "brain",
  "react",
  "jsx!Breadcrumbs"
], function(C, brain, React, Breadcrumbs) {
  "use strict";

  var pageName = "devPage";
  var component = brain.register({
    name: pageName,
    type: C.COMPONENT_TYPES.PAGE,
    routes: { "dev": loadPage }
  });

  function loadPage() {
    component.publish(C.EVENTS.PAGE.LOAD, { page: pageName });

    React.render(
      <DevPage />,
      document.getElementById('content')
    );
  }

  var DevPage = React.createClass({
    getInitialState: function() {
      return {
        breadcrumbs: [{ label: "Dev Helper Page" }]
      };
    },

    render: function() {
      return (
        <div>
          <div id="breadcrumbs">
            <Breadcrumbs breadcrumbs={this.state.breadcrumbs} />
          </div>
          <div id="pageContent">

            <div className="row">
              <div className="col-lg-12">
                <p>
                  A few methods to help out while in development.
                </p>

                <ul>
                  <li><a href="#">Empty BIRD_IMAGES database</a></li>
                  <li><a href="#">Empty BIRD_QUESTION database</a></li>
                  <li>Find orphaned images</li>
                </ul>

              </div>
            </div>

          </div>
        </div>
      );
    }
  });

});
