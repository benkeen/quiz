define([
  "react"
], function(React) {

  var QuestionList = React.createClass({
    render: function() {
      return (
        <div className="row">
          <div className="col-lg-12">
            <ul>
              <li><a href="#questions/add/multipleQuestionImage">Multiple question: single image</a></li>
            </ul>
          </div>
        </div>
      );
    }
  });

  return QuestionList;
});
