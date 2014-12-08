define([
  "constants",
  "brain",
  "react",
  "jsx!Breadcrumbs"
], function(C, brain, React, Breadcrumbs) {
  "use strict";

  // component, register thyself
  var pageName = "aboutPage";
  var component = brain.register({
    name: pageName,
    type: C.COMPONENT_TYPES.PAGE,
    init: init
  });

  function init() {
    brain.crossroads.addRoute("", loadPage);
    brain.crossroads.addRoute("about", loadPage);
  };

  function loadPage() {
    component.publish(C.EVENTS.PAGE.LOAD, { page: pageName });

    React.render(
      <AboutPage />,
      document.getElementById('content')
    );
  };
  
  var AboutPage = React.createClass({
    getInitialState: function() {
      return {
        breadcrumbs: [{ label: "About" }]
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
                  In case someone stumbles upon this, this project is in very early days - even the code structure isn't fully
                  decided yet, I'm just tinkering with different patterns right now.
                </p>
                <p>
                  It's going to be a sort of open source, online game for birders. Half of it will be a resource manager: allowing
                  uploads of bird images and audio; the other half will be a game that quizzes you about your bird knowledge.
                  I'll be tying it into eBird so the quizzes it constructs can be location-specific, to give the most relevant value.
                </p>
                <p>
                  But step 1 is the resource database and meta-tagging of image data. That's what I'm focusing on right now.
                </p>
              </div>
            </div>

          </div>
        </div>
      );
    }
  });

});
