define([
  "../../libs/react",
  "crossroads",
  "text!questionsTemplate",
  "jsx!multipleQuestionImage"
], function(React, crossroads, questionsTemplate, multipleQuestionImage) {


  var _init = function() {
    crossroads.addRoute("questions", _loadPage);
    crossroads.addRoute("questions/add/{type}", _addQuestionPage);
  };

  var _loadPage = function(opts) {

    console.log(opts);

    // first, always register the main page template
    $("#content").html(questionsTemplate);

  };

  var _addQuestionPage = function () {

  };

  var QuestionTable = React.createClass({
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

  //React.render(
  //  <QuestionTable url="http://localhost:8000/questions/_all_docs?include_docs=true" />,
  //  document.getElementById('list')
  //);


  return {
    init: _init
  };
});
