define([
  "constants",
  "brain",
  "react"
], function(C, brain, React) {

  var componentID = "header";

  var init = function() {
    brain.subscribe(componentID, C.EVENTS.PAGE.LOAD, onLoadPage);

    React.render(
      <Header />,
      document.getElementById("header")
    );
  };

  var onLoadPage = function(msg) {
    console.log("page loaded: ", msg);
  };

  var Header = React.createClass({
    render: function() {
      return (
        <div className="navbar navbar-inverse">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-inverse-collapse">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Quiz</a>
          </div>
          <div className="navbar-collapse collapse navbar-inverse-collapse">
            <ul className="nav navbar-nav">
              <li data-page="aboutPage"><a href="#about">About</a></li>
              <li data-page="takeQuizPage">
                <a href="#quiz">Take a Quiz</a>
              </li>
              <li data-page="questionPage">
                <a href="#questions">Questions</a>
              </li>
              <li data-parent-page="contributePage" className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Contribute
                  <b className="caret"></b>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="#">How to contribute</a>
                  </li>
                  <li className="divider"></li>
                  <li className="dropdown-header">Question</li>
                  <li>
                    <a href="#questions/add/multipleQuestionImage">Multiple-choice image</a>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="#">Github</a>
              </li>
            </ul>
          </div>
        </div>
      )
    }
  });

  return {
    name: componentID,
    type: C.COMPONENT_TYPES.MODULE,
    init: init
  };
});
