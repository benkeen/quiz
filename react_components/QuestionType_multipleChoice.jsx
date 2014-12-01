define([
  "brain",
  "react",
  "jsx!FileUpload",
  "jsx!TypeAheadField"
], function(brain, React, FileUpload, TypeAheadField) {
  "use strict";


  var MultipleChoice = React.createClass({
    getDefaultProps: function() {
      return {
        id: null
      }
    },

    getInitialState: function() {
      return {
        status: "new"
      }
    },

    render: function() {
      return (
        <div>
          <p>
            This question type is of the form: single bird image, with multiple responses - only of which is correct.
          </p>

          <h3>Step 1: Upload image</h3>

          <div className="row form-group">
            <div className="col-lg-2">Species</div>
            <div className="col-lg-10">
              <TypeAheadField />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-lg-2">Image</div>
            <div className="col-lg-10">
              <FileUpload />

              <div>Recommended image size: <b>1024</b> x <b>768px</b></div>
            </div>
          </div>
        </div>
      );
    }
  });


  var Step2 = React.createClass({
    render: function() {
      return (
        <div>
          <div class="row">
            <div class="col-lg-2">Question</div>
            <div class="col-lg-10">
              <input type="text" class="form-group" />
            </div>
          </div>

          <div class="row">
            <div class="col-lg-2">Image</div>
            <div class="col-lg-10">
              <input type="text" class="form-group" />
            </div>
          </div>

          <div class="row">
            <div class="col-lg-2">Num</div>
            <div class="col-lg-2">Correct</div>
            <div class="col-lg-2">Answer</div>
          </div>
        </div>
      );
    }
  });

  return MultipleChoice;
});
