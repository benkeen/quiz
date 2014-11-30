define([
  "../core/constants",
  "brain",
  "react"
], function(C, brain, React) {

  var componentID = "header";
  var page = "";
  var header;

  var init = function() {
    brain.subscribe(componentID, C.EVENTS.PAGE.LOAD, onLoadPage);

    // render our header. This is done once.
    header = React.render(
      <Header page={page} />,
      document.getElementById("header")
    );
  };

  var onLoadPage = function(msg) {
    header.setProps({ page: msg.data.page });
  };


  var Header = React.createClass({
    getInitialState: function() {
      return {
        previousPage: "",
        page: "",
        githubLink: "http://whatever.com"
      };
    },

    componentWillReceiveProps: function(newProps) {
      var lastPage = this.state.page;
      this.state.page = newProps.page;

      // well this is ugly. Need to figure out if there's an appropriate way to parse the subDOM of the React
      // component
      if (lastPage !== "") {
        var previousPageEl = this.refs[lastPage + "Link"].getDOMNode();
        $(previousPageEl).removeClass("active");
      }
      var newPageEl = this.refs[this.state.page + "Link"].getDOMNode();
      $(newPageEl).addClass("active");

      this.state.previousPage = lastPage;
    },

    render: function() {
      return (
        <div className="navbar navbar-inverse">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-inverse-collapse">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#about">Quiz</a>
          </div>
          <div className="navbar-collapse collapse navbar-inverse-collapse">
            <ul className="nav navbar-nav">
              <li data-page="aboutPage" ref="aboutPageLink"><a href="#about">About</a></li>
              <li data-page="takeQuizPage" ref="takeQuizPageLink"><a href="#quiz">Take a Quiz</a></li>
              <li data-page="questionsPage" ref="questionsPageLink"><a href="#questions">Questions</a></li>
              <li data-page="taxonomyPage" ref="taxonomyPageLink"><a href="#questions">Taxonomy</a></li>
              <li data-parent-page="contributePage" className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Contribute
                  <b className="caret"></b>
                </a>
                <ul className="dropdown-menu">
                  <li><a href="#">How to contribute</a></li>
                  <li className="divider"></li>
                  <li className="dropdown-header">Question</li>
                  <li><a href="#questions/add/multipleQuestionImage">Multiple-choice image</a></li>
                </ul>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href={this.state.githubLink}>Github</a>
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
