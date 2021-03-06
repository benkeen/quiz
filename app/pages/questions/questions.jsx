define([
  "constants",
  "brain",
  "react",
  "jsx!QuestionList"
], function(C, brain, React, QuestionList) {

  // component, register thyself
  var pageName = "questionsPage";
  var component = brain.register({
    name: pageName,
    type: C.COMPONENT_TYPES.PAGE,
    routes: { "questions": loadPage }
  });


  function loadPage() {
    publishPageLoaded();

    // set the page template
    //pageHelper.renderPage({
    //  breadcrumbs: [{ label: "Questions" }],
    //  pageContent: ""
    //});

    React.render(
      <QuestionList />,
      document.getElementById('pageContent')
    );
  };

  function addQuestionPage() {
    publishPageLoaded();

    // set the page template
    //pageHelper.renderPage({
    //  breadcrumbs: [{
    //    label: "Questions", link: "#questions"
    //  }, {
    //    label: "Add Question"
    //  }]
    //});

    React.render(
      <MultipleChoiceQuestion />,
      document.getElementById('pageContent')
    );
  };

  function publishPageLoaded() {
    component.publish(C.EVENTS.PAGE.LOAD, { page: pageName });
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
});
