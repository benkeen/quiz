define([
  "constants",
  "brain",
  "pageHelper",
  "react",
  "crossroads",
  "text!questionsTemplate",
  "jsx!MultipleChoiceQuestion"
], function(C, brain, pageHelper, React, crossroads, questionsTemplate, MultipleChoiceQuestion) {

  var componentID = "questionsPage";

  var init = function() {
    crossroads.addRoute("questions", loadPage);
    crossroads.addRoute("questions/add/{type}", addQuestionPage);
  };

  var loadPage = function(opts) {
    publishPageLoaded();

    // set the page template
    pageHelper.renderPage({
      breadcrumbs: [{ label: "Questions" }],
      pageContent: questionsTemplate
    });
  };

  var addQuestionPage = function () {
    publishPageLoaded();

    // set the page template
    pageHelper.renderPage({
      breadcrumbs: [{
        label: "Questions", link: "#questions"
      }, {
        label: "Add Question"
      }]
    });

    React.render(
      <MultipleChoiceQuestion />,
      document.getElementById('pageContent')
    );
  };


  var publishPageLoaded = function() {
    brain.publish(componentID, C.EVENTS.PAGE.LOAD, { page: componentID });
  };


/*  var QuestionTable = React.createClass({
    displayName: 'QuestionTable',

    getQuestions: function () {
      $.ajax({
        url: this.props.url,
        type: "GET",
        dataType: "json",
        success: function (data) {
          this.setState({data: data.rows});
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    getInitialState: function () {
      return {data: []};
    },
    componentDidMount: function () {
      this.getQuestions();
    },
    render: function () {
      return (
        <QuestionRows data={this.state.data} />
      );
    }
  });

  var QuestionRows = React.createClass({
    render: function () {
      var rows = this.props.data.map(function (row) {
        return (
          <div>{row.doc.question}</div>
        );
      });

      return (
        <div className="commentList">
        {rows}
        </div>
      );
    }
  });
*/

  //React.render(
  //  <QuestionTable url="http://localhost:8000/questions/_all_docs?include_docs=true" />,
  //  document.getElementById('list')
  //);


  return {
    name: componentID,
    type: C.COMPONENT_TYPES.PAGE,
    init: init
  };
});
