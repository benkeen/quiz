define([
  "constants",
  "brain",
  "react",
  "jsx!TypeAheadField"
], function(C, brain, React, TypeAheadField) {
  "use strict";

  var COMPONENT_ID = "QuestionType_multipleChoice";
  var MultipleChoice = React.createClass({

    getInitialState: function() {
      return {
        currentDocId: null,
        currentDocRev: null
      }
    },

    componentWillMount: function() {
      var self = this;
      //brain.subscribe(COMPONENT_ID, C.EVENTS.TYPEAHEAD_ITEM_SELECTED, function(msg) {
      //  console.log(msg);
      //});

      if (_.isNull(this.state.currentDocId)) {
        brain.db.createNewQuestion(function(resp) {
          self.setState({
            currentDocId: resp.id,
            currentDocRev: resp.rev
          });
        });
      }
    },

    submitStep1: function(e) {
      e.preventDefault();

      var fileUploadField = this.refs.fileUpload.getDOMNode();
      var file = fileUploadField.files[0];

      var putRequest = new XMLHttpRequest();
      putRequest.open('PUT', C.DB.BASE_URL + "/" + C.DB.BIRD_IMAGES.NAME + "/" + this.state.currentDocId + '?rev=' + this.state.currentDocRev, true);
      putRequest.setRequestHeader('Content-Type', "application/json");

      var fileReader = new FileReader();
      fileReader.onload = function(e) {
        putRequest.send(JSON.stringify({
          filename: file.name,
          filetype: file.type,
          species: "",
          data: e.target.result
        }));
      };
      fileReader.readAsDataURL(file);

      putRequest.onreadystatechange = function(response) {
        if (putRequest.readyState == 4) {
          console.log(putRequest);
        }
      };
    },

    render: function() {
      return (
        <div>
          <p>
            Question Format: <i>single bird image</i>, <i>multiple possible responses</i>.
          </p>

          <h3>Step 1: Upload image</h3>

          <form id="step1Form" method="post" encType="multipart/form-data" onSubmit={this.submitStep1}>
            <input type="hidden" name="_id" id="_id" value={this.state.currentDocId} />
            <input type="hidden" name="_rev" id="_rev" value={this.state.currentDocRev} />

            <div className="row form-group">
              <div className="col-lg-2">Species</div>
              <div className="col-lg-10">
                <TypeAheadField />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-lg-2">Image</div>
              <div className="col-lg-10">
                <div className="form-group"><input type="file" ref="fileUpload" name="_attachments" /></div>
                <div>Recommended image size: <b>1024</b> x <b>768px</b></div>
              </div>
            </div>

            <p>
              <input type="submit" className="btn btn-primary" value="Continue &raquo;" />
            </p>
          </form>
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
