define([
  "constants",
  "brain",
  "react"
], function(C, brain, React) {

  var component = brain.register({
    name: "header",
    type: C.COMPONENT_TYPES.MODULE,
    init: init
  });

  var page = "";
  var header;


  function init() {
    component.subscribe(C.EVENTS.PAGE.LOAD, onLoadPage);

    // render our header. This is done once.
    header = React.render(
      <Header page={page} />,
      document.getElementById("header")
    );
  };

  function onLoadPage(msg) {
    header.setProps({ page: msg.data.page });
  };


  var Header = React.createClass({
    getInitialState: function() {
      return {
        previousPage: "",
        page: "",
        githubLink: C.CORE.GITHUB_URL
      };
    },

    componentWillReceiveProps: function(newProps) {
      var lastPage = this.state.page;
      this.state.page = newProps.page;

      // well this is sure ugly. Need to figure out if there's an appropriate way to parse the subDOM of the React
      // component
      if (lastPage !== "" && this.refs[lastPage + "Link"]) {
        var previousPageEl = this.refs[lastPage + "Link"].getDOMNode();
        $(previousPageEl).removeClass("active");
      }

      if (this.refs[this.state.page + "Link"]) {
        var newPageEl = this.refs[this.state.page + "Link"].getDOMNode();
        $(newPageEl).addClass("active");
      }

      this.state.previousPage = lastPage;
    },

    render: function() {
      return (
        <div className="navbar navbar-default">
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
              <li data-page="questionsPage" ref="questionsPageLink"><a href="#questions">Questions</a></li>
              <li data-page="imagesPage" ref="imagesPageLink"><a href="#images">Images</a></li>
              <li data-page="devPage" ref="devPageLink"><a href="#dev">Dev</a></li>
              <li data-parent-page="contributePage" className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Contribute
                  <b className="caret"></b>
                </a>
                <ul className="dropdown-menu">
                  <li><a href="#">Ways to contribute</a></li>
                  <li className="divider"></li>
                  <li><a href="#questions/add">Write a Question</a></li>
                  <li><a href="#images/add">Upload an Image</a></li>
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
});
